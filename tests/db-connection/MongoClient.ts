import { connect, model, Schema } from "mongoose";

if (!process.env.MONGODB_CONNECTION_STRING) {
  console.error("MONGODB_CONNECTION_STRING is not defined in the environment variables.");
  process.exit(1);
}

async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_CONNECTION_STRING as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export const UserModel = model("users", new Schema({}));

connectToDatabase();
