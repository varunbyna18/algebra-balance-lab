const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://varunbyna157_db_user:JTGeBrpZy6lCSsTa@cluster0.mgbx7np.mongodb.net/algebra-balance-lab';

console.log('🔍 Testing MongoDB Atlas connection...');
console.log('📍 Connection string:', MONGODB_URI ? MONGODB_URI.replace(/\/\/.*@/, '//***:***@') : 'undefined');

async function testAtlasConnection() {
  try {
    await mongoose.connect(MONGODB_URI);
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    console.log(`📍 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
    
    // Test a simple operation
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📁 Collections found: ${collections.length}`);
    
    if (collections.length > 0) {
      console.log('📋 Available collections:');
      collections.forEach(collection => {
        console.log(`  - ${collection.name}`);
      });
    }
    
    // Test inserting a document
    const testDoc = { test: 'Atlas connection working', timestamp: new Date() };
    const result = await mongoose.connection.db.collection('test').insertOne(testDoc);
    console.log('✅ Test document inserted:', result.insertedId);
    
    await mongoose.connection.close();
    console.log('👋 Atlas connection test completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Atlas connection test failed:', error.message);
    process.exit(1);
  }
}

testAtlasConnection();
