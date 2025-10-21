const mongoose = require('mongoose');
const Equation = require('./models/Equation');

const MONGODB_URI = process.env.MONGODB_URI;

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

async function seedDatabase() {
  try {
    const mongooseOptions = {
      // Modern MongoDB driver options
    };
    
    await mongoose.connect(MONGODB_URI, mongooseOptions);
    console.log('✅ Connected to MongoDB for seeding');

    // Clear existing equations
    await Equation.deleteMany({});
    console.log('🗑️ Cleared existing equations');

    // Insert sample equations
    await Equation.insertMany(sampleEquations);
    console.log('🌱 Seeded database with sample equations');
    console.log(`📊 Total equations: ${sampleEquations.length}`);

    await mongoose.connection.close();
    console.log('👋 Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    console.error('💡 Make sure your MongoDB Atlas connection string is correct in .env file');
    await mongoose.connection.close();
    process.exit(1);
  }
}

seedDatabase();

