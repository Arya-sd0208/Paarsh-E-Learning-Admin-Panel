import type { Metadata } from "next";
import CoursesClient from "./CoursesClient";

export const metadata: Metadata = {
  title: "Professional IT & Programming Courses | Full Stack, AI & Data Science Training",
  description:
"Explore career-focused IT courses including Programming, Web Development, AI, Data Science, Cloud, Cyber Security & Design. Learn with practical projects & expert mentors.",
  alternates: {
    canonical: "/courses",
  },

  openGraph: {
    title: "IT Courses | Paarsh E-Learning",
    description:
      "Browse career-focused IT courses with mentorship and real-world projects.",
    url: "https://paarshelearning.com/courses",
    images: [
      {
        url: "https://paarshelearning.com/og-courses.png",
        width: 1200,
        height: 620,
        alt: "Paarsh E-Learning Courses",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "IT Courses | Paarsh E-Learning",
    description:
      "Browse career-focused IT courses with mentorship and real-world projects.",
    images: ["https://paarshelearning.com/og-courses.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function CoursesPage() {
  return <CoursesClient />;
}

