import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET all dresses
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("aeloria");

    // Try 'clothes' collection first, then 'dresses'
    let dresses = await db.collection("clothes").find({}).toArray();

    if (dresses.length === 0) {
      dresses = await db.collection("dresses").find({}).toArray();
    }

    // Convert all Google Drive URLs to direct links
    dresses = dresses.map(dress => ({
      ...dress,
      image: convertGoogleDriveUrl(dress.image)
    }));

    return NextResponse.json({ success: true, dresses });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Add new dress
export async function POST(request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("aeloria");

    // Auto-generate description if not provided
    let description = body.description;
    if (!description || description.trim() === '') {
      description = generateDescription(body.name, body.category);
    }

    // Convert Google Drive URL to direct link
    let imageUrl = body.image;
    if (imageUrl && imageUrl.includes('drive.google.com')) {
      imageUrl = convertGoogleDriveUrl(imageUrl);
    }

    const dress = {
      ...body,
      description,
      image: imageUrl,
      createdAt: new Date(),
    };

    // Use 'clothes' collection to match existing data
    const result = await db.collection("clothes").insertOne(dress);

    return NextResponse.json({ success: true, id: result.insertedId });
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
  
  // If already in thumbnail format, return as is
  if (url.includes('lh3.googleusercontent.com') || url.includes('drive.google.com/thumbnail')) {
    return url;
  }
  
  // Extract file ID from various Google Drive URL formats
  let fileId = null;
  
  // Format: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  const match1 = url.match(/\/file\/d\/([^\/\?]+)/);
  if (match1) {
    fileId = match1[1];
  }
  
  // Format: https://drive.google.com/open?id=FILE_ID
  if (!fileId) {
    const match2 = url.match(/[?&]id=([^&]+)/);
    if (match2) {
      fileId = match2[1];
    }
  }
  
  // Format: https://drive.google.com/uc?id=FILE_ID or uc?export=view&id=FILE_ID
  if (!fileId) {
    const match3 = url.match(/\/uc\?.*id=([^&]+)/);
    if (match3) {
      fileId = match3[1];
    }
  }
  
  // If we found a file ID, convert to thumbnail format (works better with CORS)
  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  }
  
  // Return original URL if no conversion needed
  return url;
}

// Helper function to generate descriptions
function generateDescription(name, category = "Cord Set") {
  const templates = {
    "Cord Set": [
      `A beautiful ${name} featuring coordinated pieces for effortless style. Perfect for various occasions with comfortable fit and elegant design.`,
      `Elevate your wardrobe with this stunning ${name}. The perfectly matched set offers versatility and sophistication for any event.`,
      `This exquisite ${name} combines comfort and style seamlessly. Ideal for creating elegant looks with minimal effort.`,
    ],
    "Fancy": [
      `A dazzling ${name} designed to make you stand out. Perfect for parties, celebrations, and special occasions where you want to shine.`,
      `Make a statement with this gorgeous ${name}. Features intricate details and premium quality for those memorable moments.`,
      `This stunning ${name} is crafted for elegance and glamour. Ideal for events where you want to look your absolute best.`,
    ],
    "Fancy Cord": [
      `An exquisite ${name} that blends traditional craftsmanship with modern style. Perfect for weddings, festivals, and grand celebrations.`,
      `Elevate your ethnic wardrobe with this magnificent ${name}. Features detailed embellishments and luxurious fabric for special occasions.`,
      `This breathtaking ${name} showcases intricate work and elegant design. Ideal for making unforgettable impressions at formal events.`,
    ],
    "Ready Made": [
      `A convenient ${name} that's ready to wear and easy to style. Perfect for everyday elegance and hassle-free fashion.`,
      `Embrace effortless style with this practical ${name}. Designed for comfort and convenience without compromising on looks.`,
      `This versatile ${name} offers instant style and comfort. Ideal for busy lifestyles and various occasions.`,
    ],
  };
  
  const categoryTemplates = templates[category] || templates["Cord Set"];
  return categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)];
}
