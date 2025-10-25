const mongoose = require('mongoose')

const connnectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB connected');
        
    } catch (error) {
        console.log('MongoDB connection failed',error);
        
    }
}

module.exports = connnectDB;