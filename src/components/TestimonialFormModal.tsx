"use client";

import { useState } from "react";
import { X, Star } from "lucide-react";

interface TestimonialFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function TestimonialFormModal({ isOpen, onClose, onSuccess }: TestimonialFormModalProps) {
    const [form, setForm] = useState({
        name: "",
        course: "",
        message: "",
        rating: 5,
    });
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.message) {
            alert("Please fill in name and message");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/testimonial", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                alert("Thank you for your feedback! Your testimonial has been submitted.");
                onClose();
                if (onSuccess) onSuccess();
                setForm({ name: "", course: "", message: "", rating: 5 });
            } else {
                const data = await res.json();
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("Error submitting testimonial:", error);
            alert("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <X className="h-6 w-6 text-gray-400" />
                </button>

                <h2 className="text-3xl font-bold text-[#2B4278] mb-2">Share Your Story</h2>
                <p className="text-gray-500 mb-8">Tell us about your learning experience with Paarsh E-Learning.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Full Name</label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. John Doe"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full p-4 rounded-xl border border-gray-200 focus:border-[#01A0E2] focus:ring-2 focus:ring-blue-100 outline-none transition"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Course / Role</label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. MERN Stack Student"
                            value={form.course}
                            onChange={(e) => setForm({ ...form, course: e.target.value })}
                            className="w-full p-4 rounded-xl border border-gray-200 focus:border-[#01A0E2] focus:ring-2 focus:ring-blue-100 outline-none transition"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Your Rating</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setForm({ ...form, rating: star })}
                                    className="focus:outline-none transition-transform active:scale-90"
                                >
                                    <Star
                                        className={`h-8 w-8 ${star <= form.rating
                                                ? "text-yellow-400 fill-yellow-400"
                                                : "text-gray-200"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Message</label>
                        <textarea
                            required
                            placeholder="Tell us what you liked about the course..."
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            className="w-full p-4 rounded-xl border border-gray-200 focus:border-[#01A0E2] focus:ring-2 focus:ring-blue-100 outline-none transition min-h-[120px]"
                        />
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-[#01A0E2] to-[#2B4278] text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Submitting..." : "Post Testimonial"}
                    </button>
                </form>
            </div>
        </div>
    );
}


