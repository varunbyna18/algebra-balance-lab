const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/algebra-balance-lab';

async function testConnection() {
  try {
    console.log('🔍 Testing MongoDB connection...');
    console.log(`📍 Connection string: ${MONGODB_URI.replace(/\/\/.*@/, '//***:***@')}`);
    
    const mongooseOptions = {
      serverSelectionTimeoutMS: 5000,
    };
    
    await mongoose.connect(MONGODB_URI, mongooseOptions);
    
    console.log('✅ Successfully connected to MongoDB!');
    console.log(`📍 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
    console.log(`🔌 Port: ${mongoose.connection.port}`);
    console.log(`📊 Ready State: ${mongoose.connection.readyState}`);
    
    // Test a simple operation
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📁 Collections found: ${collections.length}`);
    
    if (collections.length > 0) {
      console.log('📋 Available collections:');
      collections.forEach(collection => {
        console.log(`  - ${collection.name}`);
      });
    }
    
    await mongoose.connection.close();
    console.log('👋 Connection test completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.error('💡 Check your username and password in the connection string');
    } else if (error.message.includes('network')) {
      console.error('💡 Check your network access settings in MongoDB Atlas');
    } else if (error.message.includes('timeout')) {
      console.error('💡 Check your connection string and network settings');
    }
    
    console.error('💡 Make sure your .env file contains the correct MONGODB_URI');
    process.exit(1);
  }
}

testConnection();
