import mongoose from "mongoose";


const connectDB = async () => {
    try {

        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongodb connected successfully!",connectionInstance.connection.host);

    } catch (error) {
        console.log("error while connecting database",error);

        process.exit(1);
    }
}

export { connectDB };