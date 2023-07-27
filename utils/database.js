import mongoose from 'mongoose';

let isConnected = false;

export const connectToDatabase = async () => {
    mongoose.set("strictQuery", true);

    if (isConnected) {
        console.log("=> using existing database connection");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}