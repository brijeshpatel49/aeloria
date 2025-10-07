import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET single dress
export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("aeloria");
    
    // Try 'clothes' collection first, then 'dresses'
    let dress = await db.collection("clothes").findOne({ _id: new ObjectId(params.id) });
    if (!dress) {
      dress = await db.collection("dresses").findOne({ _id: new ObjectId(params.id) });
    }

    if (!dress) {
      return NextResponse.json(
        { success: false, error: "Dress not found" },
        { status: 404 }
      );
    }

    // Convert Google Drive URL to direct link
    dress.image = convertGoogleDriveUrl(dress.image);

    return NextResponse.json({ success: true, dress });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Helper function to convert Google Drive URLs
function convertGoogleDriveUrl(url) {
  if (!url) return url;
  
  // If already in correct format, return as is
  if (url.includes('drive.google.com/uc?')) {
    return url;
  }
  
  // Extract file ID from various Google Drive URL formats
  let fileId = null;
  
  // Format: https://drive.google.com/file/d/FILE_ID/view
  const match1 = url.match(/\/file\/d\/([^\/]+)/);
  if (match1) {
    fileId = match1[1];
  }
  
  // Format: https://drive.google.com/open?id=FILE_ID
  const match2 = url.match(/[?&]id=([^&]+)/);
  if (match2) {
    fileId = match2[1];
  }
  
  // If we found a file ID, convert to direct link
  if (fileId) {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  
  // Return original URL if no conversion needed
  return url;
}

// PUT - Update dress
export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("aeloria");

    // Try updating in 'clothes' first, then 'dresses'
    let result = await db.collection("clothes").updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { ...body, updatedAt: new Date() } }
    );
    
    if (result.matchedCount === 0) {
      result = await db.collection("dresses").updateOne(
        { _id: new ObjectId(params.id) },
        { $set: { ...body, updatedAt: new Date() } }
      );
    }

    return NextResponse.json({ success: true, modified: result.modifiedCount });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE dress
export async function DELETE(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("aeloria");

    // Try deleting from 'clothes' first, then 'dresses'
    let result = await db.collection("clothes").deleteOne({ _id: new ObjectId(params.id) });
    
    if (result.deletedCount === 0) {
      result = await db.collection("dresses").deleteOne({ _id: new ObjectId(params.id) });
    }

    return NextResponse.json({ success: true, deleted: result.deletedCount });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
