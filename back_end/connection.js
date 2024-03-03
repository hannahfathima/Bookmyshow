import mongoose from "mongoose";

async function connection(){
    const URL=process.env.DB_URL+process.env.DB_NAME
    const db=await mongoose.connect(URL);
    console.log("Database connected");
    return db
}

export default connection;