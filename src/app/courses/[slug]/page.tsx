import { notFound } from "next/navigation";
import { coursesMap } from "@/lib/courses";
import CourseDetailClient from "./CourseDetailClient";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {

  const { slug } = await params;   // ✅ MUST await
  const course = coursesMap[slug as keyof typeof coursesMap];

  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: course.metaTitle,
    description: course.metaDescription,
    keywords: course.keywords,
    alternates: {
      canonical: course.canonicalUrl,
    },
    openGraph: {
      title: course.metaTitle,
      description: course.metaDescription,
      url: course.canonicalUrl,
      siteName: "Paarshe Learning",
      images: [
        {
          url: `https://paarshelearning.com${course.cardImage ?? "/og-courses.png"}`,
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: course.metaTitle,
      description: course.metaDescription,
      images: [
        `https://paarshelearning.com${course.cardImage ?? "/og-courses.png"}`
      ],
    },
  };
}

export default async function CourseDetailPage(
  { params }: PageProps
) {
  const { slug } = await params;   // ✅ MUST await
  const course = coursesMap[slug as keyof typeof coursesMap];

  if (!course) return notFound();

  return <CourseDetailClient course={course} slug={slug} />;
}
