import { MongoClient } from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const mongoClient = new MongoClient("mongodb://localhost:27017/projetao-ecommerce-back")
export const db = mongoClient.db()
try {
    await mongoClient.connect()
    console.log("MongoDB online!")
} catch (err) {
    console.log(err.message)
}
