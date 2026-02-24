import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: String,
        price: { type: Number, default: 0 },
        duration: String,
        category: String,
        level: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
            default: "Beginner",
        },
        studentsEnrolled: { type: Number, default: 0 },
        rating: { type: Number, default: 0 },
        thumbnail: String,
        syllabus: [
            {
                title: String,
                content: String,
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);
