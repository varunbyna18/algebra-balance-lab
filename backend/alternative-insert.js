const { MongoClient } = require('mongodb');

// Direct Atlas connection string
const MONGODB_URI = 'mongodb+srv://varunbyna157_db_user:JTGeBrpZy6lCSsTa@cluster0.mgbx7np.mongodb.net/algebra-balance-lab';

// All 10 equations data
const equationsData = [
  {
    equation: "x + 7 = 12",
    difficulty: "easy",
    solution: 5,
    variables: [{ name: "x", coefficient: 1 }],
    constants: [{ value: 7, side: "left" }, { value: 12, side: "right" }],
    description: "Basic addition equation"
  },
  {
    equation: "2x + 3 = 11",
    difficulty: "easy",
    solution: 4,
    variables: [{ name: "x", coefficient: 2 }],
    constants: [{ value: 3, side: "left" }, { value: 11, side: "right" }],
    description: "Simple linear equation with coefficient"
  },
  {
    equation: "3x - 5 = 10",
    difficulty: "medium",
    solution: 5,
    variables: [{ name: "x", coefficient: 3 }],
    constants: [{ value: -5, side: "left" }, { value: 10, side: "right" }],
    description: "Linear equation with subtraction"
  },
  {
    equation: "4x + 8 = 24",
    difficulty: "medium",
    solution: 4,
    variables: [{ name: "x", coefficient: 4 }],
    constants: [{ value: 8, side: "left" }, { value: 24, side: "right" }],
    description: "Medium difficulty linear equation"
  },
  {
    equation: "5x - 12 = 18",
    difficulty: "medium",
    solution: 6,
    variables: [{ name: "x", coefficient: 5 }],
    constants: [{ value: -12, side: "left" }, { value: 18, side: "right" }],
    description: "Linear equation with negative constant"
  },
  {
    equation: "2x + 15 = 35",
    difficulty: "medium",
    solution: 10,
    variables: [{ name: "x", coefficient: 2 }],
    constants: [{ value: 15, side: "left" }, { value: 35, side: "right" }],
    description: "Linear equation with larger numbers"
  },
  {
    equation: "7x - 9 = 26",
    difficulty: "hard",
    solution: 5,
    variables: [{ name: "x", coefficient: 7 }],
    constants: [{ value: -9, side: "left" }, { value: 26, side: "right" }],
    description: "Advanced linear equation"
  },
  {
    equation: "3x + 14 = 41",
    difficulty: "hard",
    solution: 9,
    variables: [{ name: "x", coefficient: 3 }],
    constants: [{ value: 14, side: "left" }, { value: 41, side: "right" }],
    description: "Complex linear equation with larger coefficients"
  },
  {
    equation: "6x - 18 = 42",
    difficulty: "hard",
    solution: 10,
    variables: [{ name: "x", coefficient: 6 }],
    constants: [{ value: -18, side: "left" }, { value: 42, side: "right" }],
    description: "Challenging linear equation"
  },
  {
    equation: "8x + 7 = 55",
    difficulty: "hard",
    solution: 6,
    variables: [{ name: "x", coefficient: 8 }],
    constants: [{ value: 7, side: "left" }, { value: 55, side: "right" }],
    description: "Expert level linear equation"
  }
];

async function alternativeInsert() {
  let client;
  
  try {
    console.log('🚀 Alternative data insertion method...');
    console.log('📍 Connecting to MongoDB Atlas with native driver...');
    
    // Connect with native MongoDB driver
    client = new MongoClient(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 10000
    });
    
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas successfully!');
    
    const db = client.db('algebra-balance-lab');
    const collection = db.collection('equations');
    
    // Check existing data
    const existingCount = await collection.countDocuments();
    console.log(`📊 Current equations in database: ${existingCount}`);
    
    if (existingCount > 0) {
      console.log('🗑️ Clearing existing equations...');
      await collection.deleteMany({});
      console.log('✅ Existing equations cleared');
    }
    
    // Insert new equations
    console.log('📝 Inserting 10 equations into Atlas...');
    const result = await collection.insertMany(equationsData);
    console.log(`✅ Successfully inserted ${result.insertedCount} equations!`);
    
    // Verify the insertion
    const finalCount = await collection.countDocuments();
    console.log(`📊 Total equations in Atlas: ${finalCount}`);
    
    // Show difficulty breakdown
    const easyCount = await collection.countDocuments({ difficulty: 'easy' });
    const mediumCount = await collection.countDocuments({ difficulty: 'medium' });
    const hardCount = await collection.countDocuments({ difficulty: 'hard' });
    
    console.log('\n📈 Difficulty breakdown:');
    console.log(`  Easy: ${easyCount}`);
    console.log(`  Medium: ${mediumCount}`);
    console.log(`  Hard: ${hardCount}`);
    
    // Show sample equations
    console.log('\n📋 Sample equations:');
    const sampleEquations = await collection.find({}).limit(3).toArray();
    sampleEquations.forEach((eq, index) => {
      console.log(`  ${index + 1}. ${eq.equation} (${eq.difficulty}) - Solution: ${eq.solution}`);
    });
    
    console.log('\n🎉 Alternative data insertion completed successfully!');
    console.log('💡 Your MongoDB Atlas database now contains all 10 equations');
    console.log('🌐 Check your Atlas dashboard to verify the data');
    
  } catch (error) {
    console.error('❌ Alternative data insertion failed:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.error('💡 Check your MongoDB Atlas username and password');
    } else if (error.message.includes('network')) {
      console.error('💡 Check your network connection and Atlas cluster status');
    } else if (error.message.includes('timeout')) {
      console.error('💡 Connection timeout - check your internet connection');
    } else if (error.message.includes('SSL') || error.message.includes('TLS')) {
      console.error('💡 SSL/TLS connection issue detected');
      console.error('💡 This is likely due to network/firewall restrictions');
      console.error('💡 Please use the manual setup guide in MANUAL_ATLAS_SETUP.md');
    }
    
  } finally {
    if (client) {
      await client.close();
      console.log('👋 Database connection closed');
    }
  }
}

// Run the alternative insertion
alternativeInsert();
