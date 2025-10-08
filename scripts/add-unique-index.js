// Script to add unique index on 'id' field in MongoDB
// Run this once: node scripts/add-unique-index.js

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || "your-mongodb-uri-here";

async function addUniqueIndex() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('aeloria');
    const collection = db.collection('clothes');
    
    // Create unique index on 'id' field (sparse to allow documents without id)
    await collection.createIndex(
      { id: 1 }, 
      { 
        unique: true, 
        sparse: true,
        name: 'unique_dress_id'
      }
    );
    
    console.log('✅ Unique index created on "id" field');
    console.log('This will prevent duplicate IDs from being added');
    
  } catch (error) {
    console.error('Error creating index:', error);
  } finally {
    await client.close();
  }
}

addUniqueIndex();
