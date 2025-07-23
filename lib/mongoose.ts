import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached = (global as unknown as { mongoose?: MongooseCache }).mongoose;

if (!cached) {
    cached = { conn: null, promise: null };
    (global as unknown as { mongoose: MongooseCache }).mongoose = cached;
}

// Ensure cached is always defined
const safeCached: MongooseCache = cached || { conn: null, promise: null };

async function dbConnect() {
    if (safeCached.conn) {
        return safeCached.conn;
    }
    if (!safeCached.promise) {
        safeCached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        }).then((mongoose) => {
            console.log('Connected to MongoDB at', MONGODB_URI);
            return mongoose;
        });
    }
    safeCached.conn = await safeCached.promise;
    return safeCached.conn;
}

export default dbConnect; 