import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("aeloria");
    
    // List all collections
    const collections = await db.listCollections().toArray();
    
    // Try to fetch from 'clothes' collection
    const clothes = await db.collection("clothes").find({}).toArray();
    
    // Try to fetch from 'dresses' collection
    const dresses = await db.collection("dresses").find({}).toArray();
    
    return NextResponse.json({
      success: true,
      collections: collections.map(c => c.name),
      clothesCount: clothes.length,
      dressesCount: dresses.length,
      sampleClothes: clothes.slice(0, 1),
      sampleDresses: dresses.slice(0, 1)
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
