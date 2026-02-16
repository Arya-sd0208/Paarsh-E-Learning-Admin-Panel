import Image from 'next/image';
import Link from 'next/link';
import { Star, Users } from 'lucide-react';
import type { Course } from '@/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <Image
            src={course.imageUrl}
            alt={course.title}
            fill
            className="object-cover"
            data-ai-hint={course.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
<CardTitle
  className="
    font-headline
    text-xl
    leading-snug
    line-clamp-2
    min-h-[3.2rem]
  "
>          {course.title}
        </CardTitle>
        {/* <p className="mt-2 text-sm text-muted-foreground">
          By {course.instructor}
        </p> */}
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-accent fill-accent" />
            <span className="font-semibold">{course.rating}</span>
            <span className="text-muted-foreground">({course.reviews})</span>
          </div>
          <div className="font-bold text-lg text-primary">₹{course.price}</div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link href={`/courses/${course.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}