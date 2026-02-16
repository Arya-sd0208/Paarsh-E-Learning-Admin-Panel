// import mongoose from "mongoose";
// // import dotenv from "dotenv";
// import path from "path";

// // dotenv.config({
// //   path: path.resolve(process.cwd(), ".env"),
// // });

// export const connectDB = async () => {
//   if (!process.env.MONGODB_URI) {
//     console.log("ENV:", process.env.MONGODB_URI);
//     throw new Error("MONGODB_URI missing");
//   }

//   await mongoose.connect(process.env.MONGODB_URI);
// };


// // export const connectDB = async () => {
// //   if (!process.env.MONGODB_URI) {
// //     throw new Error("MONGODB_URI is missing in environment variables");
// //   }

// //   if (mongoose.connection.readyState >= 1) return;

// //   await mongoose.connect(process.env.MONGODB_URI);
// // };


// // import mongoose from "mongoose";

// // export const connectDB = async () => {
// //   if (mongoose.connection.readyState >= 1) return;

// //   try {
// //     await mongoose.connect(process.env.MONGODB_URI!);
// //     console.log("✅ MongoDB connected");
// //   } catch (error) {
// //     console.error("❌ MongoDB connection error", error);
// //     throw error;
// //   }
// // };


import mongoose from "mongoose";

export const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.error("❌ MONGODB_URI missing");
    throw new Error("MONGODB_URI missing");
  }

  if (mongoose.connection.readyState >= 1) {
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅ MongoDB Connected");
};
