import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    contact: String,
    role: {
      type: String,
      enum: ["admin", "student", "teacher"],
      default: "student",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

console.log("User Model Paths:", Object.keys(UserSchema.paths));

if (process.env.NODE_ENV === "development") {
  delete mongoose.models.User;
}

export default mongoose.models.User || mongoose.model("User", UserSchema);
