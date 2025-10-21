const mongoose = require('mongoose');
const Equation = require('./models/Equation');
require('dotenv').config();

// Force Atlas connection without fallback
const MONGODB_URI = 'mongodb+srv://varunbyna157_db_user:JTGeBrpZy6lCSsTa@cluster0.mgbx7np.mongodb.net/algebra-balance-lab';

const sampleEquations = [
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

async function forceAtlasSeed() {
  try {
    console.log('🚀 Force seeding MongoDB Atlas...');
    console.log('📍 Connection string:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@'));
    
    // Connect with minimal options
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    // Clear existing equations
    await Equation.deleteMany({});
    console.log('🗑️ Cleared existing equations');
    
    // Insert sample equations
    await Equation.insertMany(sampleEquations);
    console.log('🌱 Seeded Atlas database with sample equations');
    console.log(`📊 Total equations: ${sampleEquations.length}`);
    
    // Verify the data
    const count = await Equation.countDocuments();
    console.log(`✅ Verification: ${count} equations in Atlas`);
    
    await mongoose.connection.close();
    console.log('👋 Atlas seeding completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Atlas seeding failed:', error.message);
    console.error('💡 Please use the manual setup guide in MANUAL_ATLAS_SETUP.md');
    process.exit(1);
  }
}

forceAtlasSeed();
