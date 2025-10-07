import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';
import { ObjectId } from 'mongodb';

// Add to cart
export async function POST(request) {
  try {
    const userData = getUserFromRequest(request);
    if (!userData) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    const { dressId, quantity = 1 } = await request.json();
    const client = await clientPromise;
    const db = client.db('aeloria');

    // Check if item already in cart
    const user = await db.collection('users').findOne({ _id: new ObjectId(userData.userId) });
    
    // Convert both IDs to strings for comparison
    const dressIdStr = dressId.toString();
    const existingItem = user.cart?.find(item => item.dressId.toString() === dressIdStr);

    if (existingItem) {
      // Update quantity - increment existing quantity
      await db.collection('users').updateOne(
        { _id: new ObjectId(userData.userId), 'cart.dressId': dressId },
        { $inc: { 'cart.$.quantity': quantity } }
      );
      return NextResponse.json({ success: true, message: 'Quantity updated' });
    } else {
      // Add new item
      await db.collection('users').updateOne(
        { _id: new ObjectId(userData.userId) },
        { $push: { cart: { dressId, quantity } } }
      );
      return NextResponse.json({ success: true, message: 'Item added to cart' });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Remove from cart
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
      { $pull: { cart: { dressId } } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Update cart item quantity
export async function PUT(request) {
  try {
    const userData = getUserFromRequest(request);
    if (!userData) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    const { dressId, quantity } = await request.json();
    const client = await clientPromise;
    const db = client.db('aeloria');

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      await db.collection('users').updateOne(
        { _id: new ObjectId(userData.userId) },
        { $pull: { cart: { dressId } } }
      );
    } else {
      // Update quantity
      await db.collection('users').updateOne(
        { _id: new ObjectId(userData.userId), 'cart.dressId': dressId },
        { $set: { 'cart.$.quantity': quantity } }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
