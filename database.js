const mongoose = require('mongoose');

const connectDB = async () => {
    const uri = 'mongodb+srv://nasreddin:fPF67QXboVgkOupa@nasreddin.unjxtnz.mongodb.net/Cluster0?retryWrites=true&w=majority';
    
    try {
        await mongoose.connect(uri);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

module.exports = connectDB;