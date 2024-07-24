import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        console.log(`${process.env.MONGODB_URI_ATLAS}/${process.env.DB_NAME}`)
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI_ATLAS}/${process.env.DB_NAME}`)
        // const connectionInstance = await mongoose.connect("mongodb://0.0.0.0:27017/docter")
        console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB