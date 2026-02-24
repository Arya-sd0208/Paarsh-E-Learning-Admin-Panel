"use client";

import InquiryForm from "@/components/InquiryForm";
import { motion } from "framer-motion";

export default function InquiryPage() {
    return (
        <div className="bg-gray-50/50 dark:bg-slate-950 min-h-screen py-10">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-black text-[#2B6473] dark:text-white tracking-tight">
                            Application & Inquiry
                        </h1>
                        <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 font-medium">
                            Take the first step towards your dream career. Fill out the form below and our admissions team will get in touch with you.
                        </p>
                    </motion.div>

                    <InquiryForm
                        title="Admissions Inquiry"
                        subtitle="Please provide your details accurately so we can better assist you. "                        
                    />
                </div>
            </div>
        </div>
    );
}

