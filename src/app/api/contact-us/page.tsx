import type { Metadata } from "next";
import ContactClient from "./ContactClient";


export const metadata: Metadata = {
  title: "Contact Paarshe Learning | IT & Software Training Institute India",

  description:
    "Contact Paarshe Learning for IT course enquiries, admissions, online training details, and support. We offer industry-ready software training programs across India.",

  keywords: [
    "Paarshe Learning Contact",
    "IT Training Institute India",
    "Software Training Institute India",
    "Online IT Courses India",
    "Automation Testing Course Enquiry",
    "Full Stack Development Course India",
    "Data Science Course Enquiry",
    "QA Automation Training India",
    "Best IT Institute in India",
    "IT Course Admission India",
    "Online Software Training India",
    "Technical Training Institute India"
  ],

  alternates: {
    canonical: "https://paarshelearning.com/contact-us",
  },

  openGraph: {
    title: "Contact Paarshe Learning | IT & Software Training Institute India",
    description:
      "Get in touch with Paarshe Learning for IT course enquiries and admissions. Industry-focused online training programs available across India.",
    url: "https://paarshelearning.com/contact-us",
    siteName: "Paarshe Learning",
    type: "website",
    images: [
      {
        url: "https://paarshelearning.com/og-contact.png",
        width: 900,
        height: 600,
        alt: "Contact Paarshe Learning - IT Training Institute India",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Paarshe Learning | IT Training India",
    description:
      "Reach out for admissions, course details, and IT training enquiries across India.",
    images: [
      "https://paarshelearning.com/og-contact.png",
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
