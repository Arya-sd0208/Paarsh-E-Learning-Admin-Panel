"use client";

import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Send, CheckCircle2 } from "lucide-react";

interface InquiryFormProps {
  courseTitle?: string;
  onSuccess?: () => void;
  title?: string;
  subtitle?: string;
}

export default function InquiryForm({
  courseTitle = "General Inquiry",
  onSuccess,
  title = "Inquiry Now",
  subtitle = "Have questions? Our experts are here to help you."
}: InquiryFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (form: HTMLFormElement) => {
    const newErrors: Record<string, string> = {};
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();

    if (name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    let digits = phone.replace(/\D/g, "");

    if (!/^\d{10,15}$/.test(digits)) {
      newErrors.phone = "Enter a valid mobile number";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    const validationErrors = validateForm(formRef.current);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      const formData = new FormData(formRef.current);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: `+${phone}`,
        college: formData.get("college"),
        education: formData.get("education"),
        course_name: courseTitle
      };

      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setSubmitted(true);
      toast({
        title: "Inquiry Sent ✅",
        description: "Our team will contact you shortly.",
      });

      formRef.current.reset();
      setPhone("");
      setErrors({});
      onSuccess?.();

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error("Submission error:", err);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Failed to send inquiry. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl shadow-[#2C4276]/10 border border-slate-100 dark:border-slate-800 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#2C4276]/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-[#2B6473] dark:text-[#5d87e0]">
          {title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm leading-relaxed">
          {subtitle}
        </p>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              <input type="hidden" name="course_name" value={courseTitle} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-[#2C4276]/60 mb-2 block">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder=""
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm focus:ring-4 focus:ring-[#2C4276]/10 outline-none transition-all dark:text-white"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wider">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-[#2C4276]/60 mb-2 block">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="rahul@example.com"
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm focus:ring-4 focus:ring-[#2C4276]/10 outline-none transition-all dark:text-white"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wider">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-[#2C4276]/60 mb-2 block">Mobile Number</label>
                  <div className="phone-input-wrapper">
                    <PhoneInput
                      country={"in"}
                      value={phone}
                      onChange={(value) => {
                        setPhone(value);
                        setErrors((prev) => ({ ...prev, phone: "" }));
                      }}
                      inputClass="!w-full !rounded-2xl !border-slate-200 dark:!border-slate-700 !bg-slate-50 dark:!bg-slate-800/50 !py-6 !text-sm focus:!ring-4 focus:!ring-[#2C4276]/10 !outline-none !transition-all dark:!text-white"
                      buttonClass="!rounded-l-2xl !border-slate-200 dark:!border-slate-700 !bg-slate-50 dark:!bg-slate-800/50"
                    />
                  </div>
                  <input type="hidden" name="phone" value={`+${phone}`} />
                  {errors.phone && (
                    <p className="mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wider">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-[#2C4276]/60 mb-2 block">Education</label>
                  <select
                    name="education"
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-sm focus:ring-4 focus:ring-[#2C4276]/10 outline-none transition-all dark:text-white appearance-none">
                    <option>Diploma</option>
                    <option>Bachelor's Degree</option>
                    <option>Master's Degree</option>
                    <option>In College</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2B6473] text-white rounded-2xl py-4 text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-[#2C4276]/20 hover:bg-opacity-95 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3 mt-4"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send size={18} />
                    Submit Inquiry
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-12 py-10 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-500 mb-6 font-bold">
                <CheckCircle2 size={40} />
              </div>
              <h4 className="text-xl font-bold text-[#2C4276] dark:text-white">Thank You!</h4>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Your inquiry has been received. Our team will get back to you within 24 hours.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-8 text-sm font-bold text-[#2C4276] hover:underline"
              >
                Send another message
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
