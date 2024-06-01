import mongoose from 'mongoose'
import dotenv from "dotenv"

dotenv.config();

const uri = process.env.MONGO_URI;
export default function connectDB() {
    mongoose.connect(uri)
.then(()=> {
    console.log('successfully connected');
}).catch((err) => {
    console.error("error connecting mongodb", err);
})
}

