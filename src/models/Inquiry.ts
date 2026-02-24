import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        college: String,
        education: String,
        course_name: String,
        source: { type: String, default: "Direct" },
        status: {
            type: String,
            enum: ["New", "Contacted", "Enrolled", "Cancelled"],
            default: "New"
        }
    },
    { timestamps: true }
);

export default mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);

