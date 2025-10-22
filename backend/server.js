const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://algebra-balance-lab.vercel.app',
    'https://algebra-balance-lab-git-main-varunbyna18.vercel.app',
    'https://algebra-balance-lab-git-main-varunbyna18s-projects.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

// MongoDB connection - use direct connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://varunbyna157_db_user:JTGeBrpZy6lCSsTa@cluster0.mgbx7np.mongodb.net/algebra-balance-lab';

// MongoDB connection options for Atlas
const mongooseOptions = {
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

mongoose.connect(MONGODB_URI, mongooseOptions)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    console.log(`📍 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    console.error('💡 Make sure your MongoDB Atlas connection string is correct in .env file');
    console.error('⚠️  Server will continue running but database operations will fail');
    // Don't exit - let the server continue running
  });

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose disconnected from MongoDB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('👋 MongoDB connection closed through app termination');
  process.exit(0);
});

// Import routes
const equationRoutes = require('./routes/equations');
const attemptRoutes = require('./routes/attempts');

// Use routes
app.use('/api/equations', equationRoutes);
app.use('/api/attempts', attemptRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Algebra Balance Lab API', 
    status: 'running',
    endpoints: {
      health: '/api/health',
      equations: '/api/equations',
      attempts: '/api/attempts'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Algebra Balance Lab API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Export the app for Vercel serverless. Only listen when running locally.
if (process.env.VERCEL) {
  module.exports = app;
} else {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
