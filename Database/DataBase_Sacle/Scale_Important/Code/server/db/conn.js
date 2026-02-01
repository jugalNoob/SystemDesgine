const mongoose = require('mongoose');

const connectMongo = async () => {
  const MONGO_URI = 'mongodb+srv://jugal786:jugal786@cluster0.sgg8t.mongodb.net/ones?retryWrites=true&w=majority';

  try {
    console.log(`🔍 Trying to connect to MongoDB at: ${MONGO_URI}`);

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 20
    });

    console.log(`✅ Connected to MongoDB: ${mongoose.connection.name}`);

    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true);
    }

    mongoose.connection.on('disconnected', () => {
      console.error('⚠️ MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err.message);
    });

  } catch (err) {
    console.error('❌ Initial MongoDB connection error:', err.message);
    setTimeout(connectMongo, 5000);
  }
};

module.exports = connectMongo;
