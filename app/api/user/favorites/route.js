import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import { ObjectId } from 'mongodb';

// Add to favorites
export async function POST(request) {
  try {
    const userData = getUserFromRequest(request);
    if (!userData) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    const { dressId } = await request.json();
    const client = await clientPromise;
    const db = client.db('aeloria');

    await db.collection('users').updateOne(
      { _id: new ObjectId(userData.userId) },
      { $addToSet: { favorites: dressId } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Remove from favorites
export async function DELETE(request) {
  try {
    const userData = getUserFromRequest(request);
    if (!userData) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    const { dressId } = await request.json();
    const client = await clientPromise;
    const db = client.db('aeloria');

    await db.collection('users').updateOne(
      { _id: new ObjectId(userData.userId) },
      { $pull: { favorites: dressId } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
