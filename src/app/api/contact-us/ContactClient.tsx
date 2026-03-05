"use client";

import { useState, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Script from "next/script";


export default function ContactUsPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const validateForm = (form: HTMLFormElement) => {
  const newErrors: Record<string, string> = {};
  const formData = new FormData(form);

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (name.length < 3) {
    newErrors.name = "Name must be at least 3 characters";
  }

  const emailRegex =
  /^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
if (!emailRegex.test(email)) {
  newErrors.email = "Enter a valid email address";
}
  
// PHONE VALIDATION
let phoneValue = phone.replace(/\D/g, "");

// India country code = 91
const COUNTRY_CODE = "91";

if (!phoneValue.startsWith(COUNTRY_CODE)) {
  newErrors.phone = "Invalid country code";
} else {
  const nationalNumber = phoneValue.slice(COUNTRY_CODE.length);

  if (!/^[6-9]\d{9}$/.test(nationalNumber)) {
    newErrors.phone =
      "Enter a valid 10-digit mobile number after country code";
  }
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

  const formData = new FormData(formRef.current);

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: `+${phone}`,
    message: formData.get("message"),
  };

  try {
    const res = await fetch("/api/contactusform", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed");

    toast({
      title: "Message sent ✅",
      description:
        "Thank you for contacting Paarsh E-Learning. We’ll get back to you soon.",
    });

    formRef.current.reset();
    setPhone("");
    setErrors({});

  } catch (error) {
    toast({
      title: "Failed to send message ❌",
      description: "Please try again after some time.",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};
  return (
<div className="container mx-auto px-4 pt-8 pb-16 md:pt-10 md:pb-20">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">
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
             <div>
  <label className="block text-sm font-medium text-foreground">
    Name
  </label>
  <Input name="name" placeholder="Your Name" />

  {errors.name && (
    <p className="mt-1 text-sm text-destructive">
      {errors.name}
    </p>
  )}
</div>


   <div>
  <label className="block text-sm font-medium text-foreground">
    Email
  </label>
  <Input
    name="email"
    type="email"
    placeholder="Your Email"
  />
<input type="hidden" name="phone" value={phone} />

  {errors.email && (
    <p className="mt-1 text-sm text-destructive">
      {errors.email}
    </p>
  )}
</div>

           <div>
  <label className="block text-sm font-medium text-foreground">
    Contact Number
  </label>

  <PhoneInput
  country="in"
  countryCodeEditable={false}   // 🔒 lock country code
  disableCountryGuess={true}
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

  {errors.phone && (
    <p className="mt-1 text-sm text-destructive">
      {errors.phone}
    </p>
  )}
</div>
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Message
                </label>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* CONTACT INFO */}
        <div className="space-y-8">
          <h2 className="text-3xl font-headline font-bold">
            Contact Information
          </h2>

          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Our Office</h3>
              <p className="text-muted-foreground">
                C-206, Wisteriaa Fortune, 
                <br />
                 near Bhumkar Chowk,
                <br />
                Bhumkar Das Gugre Rd,
                <br />
                Wakad, Pune 411057
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
            <div className="mt-1 flex flex-col gap-1 text-muted-foreground">
    <a
      href="tel:+919075201035"
      className="hover:text-primary hover:underline underline-offset-4"
    >
      +91 90752 01035
    </a>

    <a
      href="tel:+919860098343"
      className="hover:text-primary hover:underline underline-offset-4"
    >
      +91 98600 98343
    </a>
  </div>
          </div>
        </div>
      </div>
      <Script
  id="local-business-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "Paarsh elearning",
      url: "https://paarshelearning.com",
      logo: "https://paarshelearning.com/logo-wide.webp",

      description:
        "Paarshe Learning offers industry-focused IT and software training programs including Full Stack Development, Data Science, and Automation Testing across India.",

      address: {
        "@type": "PostalAddress",
        streetAddress:
          "C-206, Wisteriaa Fortune, near Bhumkar Chowk, Bhumkar Das Gugre Rd",
        addressLocality: "Wakad",
        addressRegion: "Maharashtra",
        postalCode: "411057",
        addressCountry: "IN",
      },

      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+919075201035",
          contactType: "customer service",
          areaServed: "IN",
        },
        {
          "@type": "ContactPoint",
          telephone: "+919860098343",
          contactType: "customer support",
          areaServed: "IN",
        }
      ],

      areaServed: {
        "@type": "Country",
        name: "India",
      },

      sameAs: [
        "https://www.facebook.com/paarsh.elearning/",
        "https://www.instagram.com/paarsh_elearning/",
        "https://www.linkedin.com/in/paarsh-e-learning"
      ]
    })
  }}
/>


    </div>
  );
}


