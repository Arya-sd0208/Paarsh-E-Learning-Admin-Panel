import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Paarshe Learning | Leading IT & Software Training Institute India",

  description:
    "Learn about Paarshe Learning, a leading IT and software training institute in India offering industry-focused courses in Full Stack Development, Data Science, Automation Testing, and more.",

  keywords: [
    "About Paarshe Learning",
    "IT Training Institute India",
    "Software Training Institute India",
    "Online IT Courses India",
    "Best IT Institute India",
    "Full Stack Development Institute",
    "Data Science Training India",
    "Automation Testing Institute India",
    "IT Coaching Institute India",
    "Technical Training Institute India"
  ],

  alternates: {
    canonical: "https://paarshelearning.com/about-us",
  },

  openGraph: {
    title: "About Paarshe Learning | IT Training Institute India",
    description:
      "Discover Paarshe Learning's mission, vision, and commitment to delivering high-quality IT and software training across India.",
    url: "https://paarshelearning.com/about-us",
    siteName: "Paarsh E-Learning",
    type: "website",
    images: ["https://paarshelearning.com/og-about.jpeg"],

  },

  twitter: {
    card: "summary_large_image",
    title: "About Paarshe Learning | IT Training India",
    description:
      "Know more about Paarshe Learning's mission, vision, and IT training programs across India.",
    images: ["https://paarshelearning.com/og-about.jpeg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
