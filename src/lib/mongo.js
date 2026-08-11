"use server"

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";
export const db = new MongoClient(uri)

try{
    await db.connect()
    console.log("Client connected");
    
}catch{
    console.log("Something went wrong while connecting to database");
    
}finally{
    await db.close()
    console.log("Closed the connection due to error");
    
}

