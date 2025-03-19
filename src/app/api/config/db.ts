import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Mongo URI must be defined in environment variables");
}
mongoose.set("strictQuery", false);

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(MONGO_URI, {
      dbName: "expenseTracker",
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error, "Error connecting to MongoDB");
    process.exit(1);
  }
};
