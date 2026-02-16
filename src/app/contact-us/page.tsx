"use client";

import emailjs from "emailjs-com";
import { useState, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!formRef.current) return;

  const validationErrors = validateForm(formRef.current);
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) {
    return; // ⛔ stop submission
  }

  setLoading(true);

  emailjs
    .sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID!,
      formRef.current,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    )
    .then(() => {
      toast({
        title: "Message sent ✅",
        description:
          "Thank you for contacting Paarsh E-Learning. We’ll get back to you soon.",
      });

      formRef.current?.reset();
      setPhone("");
      setErrors({});
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      toast({
        title: "Failed to send message ❌",
        description: "Please try again after some time.",
        variant: "destructive",
      });
    })
    .finally(() => setLoading(false));
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
    </div>
  );
}


// "use client";

// import emailjs from "emailjs-com";
// import { useState, useRef } from "react";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Mail, Phone, MapPin } from "lucide-react";

// export default function ContactUsPage() {
//   const [loading, setLoading] = useState(false);
//   const formRef = useRef<HTMLFormElement>(null);

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!formRef.current) return;

//     emailjs
//       .sendForm(
//         process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
//         process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
//         formRef.current,
//         process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
//       )
//       .then(() => {
//         alert("Thank you for contacting Paarsh E-Learning! We'll get back to you soon ✅");
//         formRef.current?.reset();
//       })
//       .catch((error) => {
//         console.error("EmailJS Error:", error);
//         alert("Failed to send message ❌");
//       })
//       .finally(() => setLoading(false));
//   };

//   return (
//     <div className="container mx-auto px-4 py-16 md:py-24">
//       <div className="text-center max-w-3xl mx-auto">
//         <h1 className="text-4xl md:text-5xl font-headline font-bold">
//           Contact Us
//         </h1>
//         <p className="mt-4 text-lg text-muted-foreground">
//           Have questions? We'd love to hear from you. Reach out and we'll get back
//           to you shortly.
//         </p>
//       </div>

//       <div className="mt-16 grid md:grid-cols-2 gap-12">
//         {/* CONTACT FORM */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-3xl font-headline font-bold">
//               Get in Touch
//             </CardTitle>
//           </CardHeader>

//           <CardContent>
//             <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
//               {/* NAME */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground">
//                   Name
//                 </label>
//                 <Input
//                   name="name"
//                   type="text"
//                   placeholder="Your Name"
//                   required
//                 />
//               </div>

//               {/* EMAIL */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground">
//                   Email
//                 </label>
//                 <Input
//                   name="email"
//                   type="email"
//                   placeholder="Your Email"
//                   required
//                 />
//               </div>

//               {/* PHONE NUMBER */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground">
//                   Contact Number
//                 </label>
//                 <Input
//                   name="phone"
//                   type="tel"
//                   placeholder="Your Contact Number"
//                   required
//                 />
//               </div>

//               {/* MESSAGE */}
//               <div>
//                 <label className="block text-sm font-medium text-foreground">
//                   Message
//                 </label>
//                 <Textarea
//                   name="message"
//                   placeholder="Your Message"
//                   rows={5}
//                   required
//                 />
//               </div>

//               <Button type="submit" disabled={loading} className="w-full">
//                 {loading ? "Sending..." : "Send Message"}
//               </Button>
//             </form>
//           </CardContent>
//         </Card>

//         {/* CONTACT INFO */}
//         <div className="space-y-8">
//           <h2 className="text-3xl font-headline font-bold">
//             Contact Information
//           </h2>
//           <p className="text-muted-foreground">
//             Find us at our office or drop us a line through email or phone.
//           </p>

//           <div className="flex items-start gap-4">
//             <div className="bg-primary/10 p-3 rounded-full">
//               <MapPin className="h-6 w-6 text-primary" />
//             </div>
//             <div>
//               <h3 className="font-semibold text-lg">Our Office</h3>
//               <p className="text-muted-foreground">
//                 Office no 1, Bhakti Apartment,
//                 <br />
//                 Near Rasoi Hotel, Suchita Nagar,
//                 <br />
//                 Mumbai Naka,
//                 <br />
//                 Nashik 422001
//               </p>
//             </div>
//           </div>

//           <div className="flex items-start gap-4">
//             <div className="bg-primary/10 p-3 rounded-full">
//               <Mail className="h-6 w-6 text-primary" />
//             </div>
//             <div>
//               <h3 className="font-semibold text-lg">Email Us</h3>
//               <p className="text-muted-foreground">
//                 info@paarshelearning.com
//               </p>
//             </div>
//           </div>

//           <div className="flex items-start gap-4">
//             <div className="bg-primary/10 p-3 rounded-full">
//               <Phone className="h-6 w-6 text-primary" />
//             </div>
//             <div>
//               <h3 className="font-semibold text-lg">Call Us</h3>
//               <p className="text-muted-foreground">
//                 +91 90752 01035 / +91 98600 98343
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
