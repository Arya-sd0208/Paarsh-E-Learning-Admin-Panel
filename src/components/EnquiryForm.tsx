"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface EnquiryFormProps {
  courseTitle: string;
  onSuccess?: () => void;
}

export default function EnquiryForm({
  courseTitle,
  onSuccess,
}: EnquiryFormProps) {  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [phone, setPhone] = useState("");
const [errors, setErrors] = useState<Record<string, string>>({});

const validateForm = (form: HTMLFormElement) => {
  const newErrors: Record<string, string> = {};
  const formData = new FormData(form);

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const college = String(formData.get("college") || "").trim();

  if (name.length < 3) {
    newErrors.name = "Name must be at least 3 characters";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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

  if (college && college.length < 3) {
    newErrors.college = "College name must be at least 3 characters";
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
    await emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_ENQUIRY_TEMPLATE_ID!,
      formRef.current,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );

    toast({
      title: "Enquiry Sent ✅",
      description: "Our team will contact you shortly.",
    });

    formRef.current.reset();
    setPhone("");
    setErrors({});
    onSuccess?.();
  } catch (err) {
    toast({
      variant: "destructive",
      title: "Something went wrong",
      description: "Failed to send enquiry. Please try again.",
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="bg-secondary/60 rounded-2xl p-6 md:p-8 shadow-sm border border-border">
      <h3 className="text-xl font-headline font-semibold">
        Enquire Now
      </h3>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-6 space-y-4"
      >
        {/* COURSE NAME */}
        <input type="hidden" name="course_name" value={courseTitle} />

        {/* NAME */}
        <div>
          <label className="text-sm font-medium">Student Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Enter your full name"
            className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm"
          />
          {errors.name && (
  <p className="mt-1 text-sm text-destructive">{errors.name}</p>
)}
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm font-medium">Email Address</label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm"
          />
          {errors.email && (
  <p className="mt-1 text-sm text-destructive">{errors.email}</p>
)}
        </div>

        {/* PHONE */}
       <div>
  <label className="text-sm font-medium">Phone Number</label>

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
      borderRadius: "8px",
    }}
  />

  {/* hidden field for EmailJS */}
  <input type="hidden" name="phone" value={`+${phone}`} />

  {errors.phone && (
    <p className="mt-1 text-sm text-destructive">{errors.phone}</p>
  )}
</div>


        {/* COLLEGE */}
        <div>
          <label className="text-sm font-medium">College Name</label>
          <input
            type="text"
            name="college"
            placeholder="Your college / university"
            className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm"
            
          />
          {errors.college && (
  <p className="mt-1 text-sm text-destructive">{errors.college}</p>
)}
        </div>

        {/* EDUCATION */}
        <div>
          <label className="text-sm font-medium">Highest Education</label>
          <select
            name="education"
            className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm"
          >
            <option>Diploma</option>
            <option>Bachelor's Degree</option>
            <option>Master's Degree</option>
            <option>Other</option>
          </select>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition disabled:opacity-70"
        >
          {loading ? "Sending..." : "Send Enquiry"}
        </button>
      </form>
    </div>
  );
}