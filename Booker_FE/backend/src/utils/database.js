const mongoose = require('mongoose');
require('dotenv').config(); // đọc biến từ file .env

const connectDatabase = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        console.log("Mongo URI:", mongoURI);

        if (!mongoURI) {
            throw new Error("MongoDB URI is undefined. Check your .env file!");
        }

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ Connected to MongoDB successfully!');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error);
        process.exit(1);
    }
};

module.exports = connectDatabase;
