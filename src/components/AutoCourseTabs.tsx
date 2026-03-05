'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { CourseCard } from "@/components/CourseCard";
import type { Course } from "@/types";

const ALLOWED_CATEGORIES = [
  "Data Analytics",
  "Data Science",
  "Artificial Intelligence",
  // "Ethical Hacking",
  "Testing",
  "UI/UX",
  // "Game Development",
  "Full Stack",
  "AI & Machine Learning",
  // "Marketing",
  "Cyber Security",
  "Backend",
  "Programming",
  "Mobile Development",

];



const AUTO_TAB_DELAY = 4000; // 4s
const USER_PAUSE_TIME = 5 * 60 * 1000; // 5 minutes

export default function AutoCourseTabs({ courses }: { courses: Course[] }) {
  /* ================= CATEGORIES ================= */
  const categories = useMemo(() => {
    return ALLOWED_CATEGORIES.filter((category) =>
      courses.some(
        (course) => course.category?.trim() === category
      )
    );
  }, [courses]);


  const [activeTab, setActiveTab] = useState<string>("");
  const pauseUntilRef = useRef<number>(0);
  const mobileTabsRef = useRef<HTMLDivElement | null>(null);

  /* ================= INITIAL TAB ================= */
  useEffect(() => {
    if (categories.length && !activeTab) {
      const randomIndex = Math.floor(Math.random() * categories.length);
      setActiveTab(categories[randomIndex]);
    }
  }, [categories, activeTab]);

  useEffect(() => {
    if (!mobileTabsRef.current) return;

    const container = mobileTabsRef.current;
    const activeButton = container.querySelector(
      `[data-active="true"]`
    ) as HTMLElement | null;

    if (!activeButton) return;

    const scrollLeft =
      activeButton.offsetLeft -
      container.clientWidth / 2 +
      activeButton.clientWidth / 2;

    container.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });
  }, [activeTab]);

  /* ================= AUTO TAB ROTATION ================= */

  useEffect(() => {
    if (!categories.length) return;

    const interval = setInterval(() => {
      // ⛔ pause auto switching if user recently interacted
      if (Date.now() < pauseUntilRef.current) return;

      setActiveTab((prev) => {
        const index = categories.indexOf(prev);
        return categories[(index + 1) % categories.length];
      });
    }, AUTO_TAB_DELAY);

    return () => clearInterval(interval);
  }, [categories]);

  /* ================= MOBILE INITIAL TAB ================= */

  /* ================= MOBILE AUTO TAB ROTATION ================= */

  /* ================= USER TAB CHANGE ================= */
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    pauseUntilRef.current = Date.now() + USER_PAUSE_TIME; // pause for 5 min
  };

  /* ================= FILTER COURSES ================= */
  const filteredCourses = courses.filter(
    (course) => course.category?.trim() === activeTab
  );

  if (!categories.length) return null;

  const showArrows = filteredCourses.length > 3;

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className="mt-12"
    >

      {/* ================= MOBILE TABS ================= */}
      {/* ================= MOBILE TABS ================= */}
      <div className="md:hidden mb-6">
        <div
          ref={mobileTabsRef}
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleTabChange(category)}
              data-active={activeTab === category}
              className={`
          flex-shrink-0
          px-4 py-2
          rounded-full
          text-sm font-medium
          transition-all
          border
          ${activeTab === category
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-background text-foreground border-border hover:bg-orange-500 hover:text-white hover:border-orange-500"
                }
        `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>




      {/* ================= TABS ================= */}


      <TabsList className="hidden md:flex mx-auto w-fit flex-wrap gap-3 bg-transparent p-1 mb-10">
        {categories.map((category) => (
          <TabsTrigger
            key={category}
            value={category}
            className="p-0 bg-transparent rounded-lg overflow-hidden shadow-none"
          >
            <span
              className={`
                block px-6 py-2 rounded-lg text-sm font-medium capitalize transition-all
                ${activeTab === category
                  ? "bg-accent text-accent-foreground shadow-md"
                  : "bg-background text-foreground border border-border hover:bg-muted"
                }
              `}
            >
              {category}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>

      {/* ================= SLIDER ================= */}
      <TabsContent value={activeTab} className="mt-12">
        <Carousel
          opts={{ align: "start", loop: showArrows }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: true,
              stopOnMouseEnter: true,
            }),
          ]}
        >
          <CarouselContent>
            {filteredCourses.map((course) => (
              <CarouselItem
                key={course.id}
                className="basis-1/2 sm:basis-1/2 lg:basis-1/3 md:mt-12"
              >
                <CourseCard course={course} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* ✅ Show arrows only if needed */}
          {showArrows && (
            <>
              <CarouselPrevious className="bg-background hover:bg-secondary hover:text-secondary-foreground" />
              <CarouselNext className="bg-background hover:bg-secondary hover:text-secondary-foreground" />
            </>
          )}
        </Carousel>
      </TabsContent>
    </Tabs>
  );
}