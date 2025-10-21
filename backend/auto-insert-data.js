const mongoose = require('mongoose');

// Direct Atlas connection string (no .env dependency)
const MONGODB_URI = 'mongodb+srv://varunbyna157_db_user:JTGeBrpZy6lCSsTa@cluster0.mgbx7np.mongodb.net/algebra-balance-lab';

// Define the Equation schema directly
const equationSchema = new mongoose.Schema({
  equation: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  solution: {
    type: Number,
    required: true
  },
  variables: [{
    name: String,
    coefficient: Number
  }],
  constants: [{
    value: Number,
    side: String // 'left' or 'right'
  }],
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Equation = mongoose.model('Equation', equationSchema);

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

async function autoInsertData() {
  try {
    console.log('🚀 Starting automatic data insertion...');
    console.log('📍 Connecting to MongoDB Atlas...');
    
    // Connect to Atlas
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas successfully!');
    
    // Check if data already exists
    const existingCount = await Equation.countDocuments();
    console.log(`📊 Current equations in database: ${existingCount}`);
    
    if (existingCount > 0) {
      console.log('🗑️ Clearing existing equations...');
      await Equation.deleteMany({});
      console.log('✅ Existing equations cleared');
    }
    
    // Insert new equations
    console.log('📝 Inserting 10 equations into Atlas...');
    const result = await Equation.insertMany(equationsData);
    console.log(`✅ Successfully inserted ${result.length} equations!`);
    
    // Verify the insertion
    const finalCount = await Equation.countDocuments();
    console.log(`📊 Total equations in Atlas: ${finalCount}`);
    
    // Show difficulty breakdown
    const easyCount = await Equation.countDocuments({ difficulty: 'easy' });
    const mediumCount = await Equation.countDocuments({ difficulty: 'medium' });
    const hardCount = await Equation.countDocuments({ difficulty: 'hard' });
    
    console.log('\n📈 Difficulty breakdown:');
    console.log(`  Easy: ${easyCount}`);
    console.log(`  Medium: ${mediumCount}`);
    console.log(`  Hard: ${hardCount}`);
    
    // Show sample equations
    console.log('\n📋 Sample equations:');
    const sampleEquations = await Equation.find({}).limit(3);
    sampleEquations.forEach((eq, index) => {
      console.log(`  ${index + 1}. ${eq.equation} (${eq.difficulty}) - Solution: ${eq.solution}`);
    });
    
    await mongoose.connection.close();
    console.log('\n🎉 Automatic data insertion completed successfully!');
    console.log('💡 Your MongoDB Atlas database now contains all 10 equations');
    console.log('🌐 Check your Atlas dashboard to verify the data');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Automatic data insertion failed:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.error('💡 Check your MongoDB Atlas username and password');
    } else if (error.message.includes('network')) {
      console.error('💡 Check your network connection and Atlas cluster status');
    } else if (error.message.includes('timeout')) {
      console.error('💡 Connection timeout - check your internet connection');
    }
    
    console.error('💡 Please try again or use the manual setup guide');
    process.exit(1);
  }
}

// Run the automatic insertion
autoInsertData();
