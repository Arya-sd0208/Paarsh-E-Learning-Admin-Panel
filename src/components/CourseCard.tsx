import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Course } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl rounded-xl">

      {/* ===== Image Section ===== */}
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          {/* Image */}
          <Image
            src={course.imageUrl}
            alt={course.title}
            fill
            className="object-cover"
          />

          {/* Review Badge Bottom Right */}
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur px-3 py-1 rounded-full shadow flex items-center gap-1 text-xs sm:text-sm">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold">{course.rating}</span>
            <span className="text-muted-foreground">
              ({course.reviews})
            </span>
          </div>
        </div>
      </CardHeader>

      {/* ===== Content ===== */}
      <CardContent className="p-3 sm:p-6 flex flex-col flex-grow">

        {/* Title */}
        <CardTitle
          className="
            font-headline
            text-base sm:text-xl
            leading-snug
            line-clamp-2
            min-h-[2.6rem] sm:min-h-[3.2rem]
          "
        >
          {course.title}
        </CardTitle>

        {/* 🔹 Short Description */}
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {course.description}
        </p>

        {/* Duration + Certificate */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-2 mt-3">

  <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-700">
    <span>⏳</span>
    <span>{course.duration}</span>
  </div>

  <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-700">
    <span>🏆</span>
    <span>Certified</span>
  </div>

</div>

      </CardContent>

      {/* ===== Footer ===== */}
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/courses/${course.slug}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>

    </Card>
  );
}