"use client";

import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SyllabusModal({
  open,
  onClose,
  slug,
}: {
  open: boolean;
  onClose: () => void;
  slug: string;
}) {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (name: string, email: string, phone: string) => {
    const newErrors: Record<string, string> = {};

    if (name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    let digits = phone.replace(/\D/g, "");

    // remove country code 91
    if (digits.startsWith("91")) {
      digits = digits.slice(2);
    }

    if (!/^[6-9]\d{9}$/.test(digits)) {
      newErrors.phone =
        "Enter a valid 10-digit mobile number after country code";
    }

    return newErrors;
  };
  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");

    const validationErrors = validateForm(name, email, phone);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      const data = {
        name,
        email,
        phone: `+${phone}`,
        course_name: `Syllabus Download: ${slug}`,
      };

      // Submit to Backend API (Handles DB save + Email notification)
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit inquiry");

      window.open(`/syllabus/${slug}.pdf`, "_blank");
      setErrors({});
      setPhone("");
      onClose();
    } catch (err) {
      alert("Failed to send details. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-background w-full max-w-md rounded-xl p-6 relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-center mb-6">
          Course Syllabus
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <Input name="name" placeholder="Full Name" />

          {errors.name && (
            <p className="text-sm text-red-600">{errors.name}</p>
          )}          <Input name="email" type="email" placeholder="Email Address" />

          {errors.email && (
            <p className="text-sm text-red-600">{errors.email}</p>
          )}

          {/* 🌍 ALL COUNTRIES PHONE INPUT */}
          <PhoneInput
            country={"in"}
            countryCodeEditable={false}
            value={phone}
            onChange={(value) => {
              setPhone(value);
              setErrors((prev) => ({ ...prev, phone: "" }));
            }}
            inputStyle={{
              width: "100%",
              height: "42px",
            }}
          />

          {errors.phone && (
            <p className="text-sm text-red-600">{errors.phone}</p>
          )}


          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              defaultChecked
              required
              className="accent-teal-600 mt-1"
            />

            <span className="leading-snug">
              By providing your contact details, you agree to our{" "}
              <span className="text-teal-600 cursor-pointer underline">
                Privacy Policy
              </span>
            </span>
          </label>


          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700"
          >
            {loading ? "Sending..." : "Download Syllabus"}
          </Button>

        </form>
      </div>
    </div>
  );
}

