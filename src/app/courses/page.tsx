"use client";

import { useState } from "react";
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/lib/data";
import clsx from "clsx";

const categories = [
  "All",
  "Most Popular",
  "Full Stack",
  "Frontend",
  "Backend",
  "Mobile Development",
  "Data Science",
  "Data Analytics",
  "Data Engineering",
  "Artificial Intelligence",
  "Cyber Security",
  "Cloud",
  "UI/UX",
  "Testing",
  "Programming",
  "Management",
  "Marketing",
  "Game Development",
  "Web Development",
];

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCourses = courses.filter((course) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Most Popular") return course.rating >= 4.8;
    return course.category === activeCategory;
  });

  return (
        <div className="container mx-auto px-4 py-16 lg:px-10 xl:px-16 max-w-7xl">
          {/* ===== Mobile Category Tabs ===== */}
<div className="lg:hidden mb-6">
  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => setActiveCategory(category)}
        className={clsx(
          "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition",
          activeCategory === category
            ? "bg-primary text-white"
            : "bg-secondary text-muted-foreground"
        )}
      >
        {category}
      </button>
    ))}
  </div>
</div>


      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

        {/* ===== Sidebar (Scrollable) ===== */}
       <aside className="hidden lg:block lg:col-span-1">
  <div
    className="
      sticky top-24
      rounded-xl border bg-background
      p-4 space-y-1
      max-h-[75vh]
      overflow-y-auto
      scrollbar-thin
    "
  >
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => setActiveCategory(category)}
        className={clsx(
          "w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition",
          activeCategory === category
            ? "bg-primary text-white"
            : "hover:bg-secondary text-muted-foreground"
        )}
      >
        {category}
      </button>
    ))}
  </div>
</aside>

        {/* ===== Courses Grid ===== */}
        <section className="lg:col-span-3">
<div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
            {filteredCourses.length ? (
              filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
<p className="col-span-full text-center text-muted-foreground py-12">
                No courses found for this category.
              </p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
