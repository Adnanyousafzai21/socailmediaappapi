import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    
    console.log(`\n mongodb connected !! DB host", ${connectionInstance.connection.host}`)

    } catch (error) {
        console.log("MONGODB connection is Failled ", error)
        process.exit(1)

    }
}

export default connectDB