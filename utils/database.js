import mongoose from "mongoose";

let isConnected = false; //Track the connection

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("MongoDb is already Connected!");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected = true;

        console.log("MongoDb is connected!")
    } catch (error) {
        console.log(error)
    }
}

