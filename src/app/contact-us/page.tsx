"use client";

import { useState, useRef } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function ContactUsPage() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);

    try {
      const formData = new FormData(formRef.current);
      const data = {
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        phone: String(formData.get("phone") || "").trim(),
        message: String(formData.get("message") || "").trim(),
        course_name: "Contact Form",
      };

      // 1. Submit to Backend API (Handles DB save + Email notification)
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit inquiry");

      alert("Thank you for contacting Paarsh E-Learning! We'll get back to you soon ✅");
      formRef.current.reset();
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Failed to send message ❌. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold -mt-10">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Have questions? We'd love to hear from you. Reach out and we'll get back
          to you shortly.
        </p>
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-12">
        {/* CONTACT FORM */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-headline font-bold">
              Get in Touch
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              {/* NAME */}
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Name
                </label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  required
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Email
                </label>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  required
                />
              </div>

              {/* PHONE NUMBER */}
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Contact Number
                </label>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Your Contact Number"
                  required
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Message
                </label>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-[#2B6473] hover:bg-[#2B6473]/80">
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* CONTACT INFO */}
        <div className="space-y-8">
          <Link
            href="/inquiry"
            className="flex items-center justify-center gap-2 w-fit px-8 py-4 bg-[#2B6473] text-white rounded-xl font-bold hover:bg-[#2B6473]/80 shadow-lg shadow-[#2B6473]/20 transition-all active:scale-95 mb-6"
          >
            <MessageSquare size={18} />
            Fill our Inquiry Form
          </Link>

          <h2 className="text-3xl font-headline font-bold">
            Contact Information
          </h2>
          <p className="text-muted-foreground">
            Find us at our office or drop us a line through email or phone.
          </p>

          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Our Office</h3>
              <p className="text-muted-foreground">
                Office no 1, Bhakti Apartment,
                <br />
                Near Rasoi Hotel, Suchita Nagar,
                <br />
                Mumbai Naka,
                <br />
                Nashik 422001
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Email Us</h3>
              <p className="text-muted-foreground">
                info@paarshelearning.com
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Call Us</h3>
              <p className="text-muted-foreground">
                +91 90752 01035 / +91 98600 98343
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
