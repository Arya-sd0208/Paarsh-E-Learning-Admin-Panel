import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    contact: String,
    designation: { type: String, default: "Administrator" },
    avatar: String,
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

export default mongoose.models.User || mongoose.model("User", UserSchema);
