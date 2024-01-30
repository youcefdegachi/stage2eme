import  mongoose from "mongoose";

// const mongoDB = "mongodb://localhost:27017/test";

// const mongoDB = process.env.MONGODB_URI || "mongodb://localhost:27017/test";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connecting to Mongoose: ${conn.connection.host}`);
    } catch (err) {
        console.error(` error: ${err.message}`);
        process.exit(1);
    }
};

export default connectDB;