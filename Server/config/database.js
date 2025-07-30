const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔌 Database: Attempting to connect to MongoDB...');
    console.log('🔗 Database: URI:', process.env.MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Database: MongoDB connected successfully');
    
    // Log database name
    console.log('📚 Database: Connected to database:', mongoose.connection.name);
  } catch (error) {
    console.error('❌ Database: MongoDB connection error:', error.message);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Database: MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('💥 Database: MongoDB error:', err);
});

module.exports = connectDB;