const mongoose = require('mongoose');
const Equation = require('./models/Equation');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://varunbyna157_db_user:JTGeBrpZy6lCSsTa@cluster0.mgbx7np.mongodb.net/algebra-balance-lab';

async function verifyAtlasData() {
  try {
    console.log('🔍 Verifying data in MongoDB Atlas...');
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    // Count equations
    const equationCount = await Equation.countDocuments();
    console.log(`📊 Total equations in Atlas: ${equationCount}`);
    
    if (equationCount > 0) {
      // Get all equations
      const equations = await Equation.find({});
      console.log('📋 Equations in Atlas:');
      equations.forEach((eq, index) => {
        console.log(`  ${index + 1}. ${eq.equation} (${eq.difficulty}) - Solution: ${eq.solution}`);
      });
      
      // Get difficulty breakdown
      const easyCount = await Equation.countDocuments({ difficulty: 'easy' });
      const mediumCount = await Equation.countDocuments({ difficulty: 'medium' });
      const hardCount = await Equation.countDocuments({ difficulty: 'hard' });
      
      console.log('\n📈 Difficulty breakdown:');
      console.log(`  Easy: ${easyCount}`);
      console.log(`  Medium: ${mediumCount}`);
      console.log(`  Hard: ${hardCount}`);
    } else {
      console.log('❌ No equations found in Atlas database');
    }
    
    await mongoose.connection.close();
    console.log('👋 Verification completed!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    process.exit(1);
  }
}

verifyAtlasData();
