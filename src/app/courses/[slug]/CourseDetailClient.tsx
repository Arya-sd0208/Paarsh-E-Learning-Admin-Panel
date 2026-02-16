'use client';

import Image from "next/image";
import Link from "next/link";
import { useAnimateOnView } from "@/hooks/useAnimateOnView";
import EnrollWithEnquiryModal from "@/components/EnrollWithEnquiryModal";
import DownloadSyllabusCTA from "@/components/DownloadSyllabusCTA";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import {
  Clock,
  GraduationCap,
  Award,
  UserCheck,
  CheckCircle,
  Star,
  Phone,
  Radio,
  Video,
  Download,
  Infinity,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { testimonials, courses } from "@/lib/data";
import type { Course } from '@/lib/courses/types';


interface CourseDetailClientProps {
  course: any;
  slug: string;
}

interface CourseOverviewItem {
  title?: string;
  description?: string;
}




export default function CourseDetailClient({
  course,
  slug,
}: {
  course: Course;
  slug: string;
}) { const heroRef = useAnimateOnView<HTMLDivElement>();
  const metaRef = useAnimateOnView<HTMLDivElement>('animate-fadeInUp');
  const overviewRef = useAnimateOnView<HTMLDivElement>();
  const enrollRef = useAnimateOnView<HTMLDivElement>('animate-fadeInUp');
  const benefitsRef = useAnimateOnView<HTMLDivElement>();
  const testimonialRef = useAnimateOnView<HTMLDivElement>();

  return (
       <main className="bg-background">

     
{/* ===== COURSE HERO SECTION ===== */}
<section className="relative overflow-visible pt-14 pb-6 md:pt-12 md:pb-4">
  {/* SECTION BACKGROUND IMAGE */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: "url('/course-bg.png')", // 🔁 add your background image here
    }}
  />

  {/* Subtle overlay for readability */}
  <div className="absolute inset-0 bg-background/70 backdrop-blur-[1px]" />

<div
  ref={heroRef}
  className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
             grid grid-cols-1 lg:grid-cols-5 gap-12 items-center"
>
    {/* LEFT CONTENT */}
    <div className="lg:col-span-2 max-w-xl">

      {/* Breadcrumb */}
      <p className="text-xs text-muted-foreground mb-3">
        Home <span className="mx-1">/</span>
        Courses <span className="mx-1">/</span>
        <span className="text-foreground font-medium">{course.title}</span>
      </p>

      {/* Tag */}
      <span className="inline-block mb-3 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
        Career-Oriented Program
      </span>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold leading-tight">
       {course.title}
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-muted-foreground">
         {course.shortDescription}
      </p>

      {/* Highlights */}
      <ul className="mt-6 space-y-3">
        {[
          "Instructor-paced live classes with fixed schedules",
          "Real-world projects & interview preparation",
          "Resume building, mock interviews & placement support",
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
            <p className="text-sm">{item}</p>
          </li>
        ))}
      </ul>

      {/* Meta Info */}
      <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
                          {course.duration}

        </div>
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-primary" />
          Beginner → Advanced
        </div>
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-primary" />
          Placement Focused
        </div>
      </div>

      {/* CTAs */}
      <div className="mt-8 flex flex-wrap gap-4">

<EnrollWithEnquiryModal courseTitle={course.title} />

{/* <Button asChild size="lg" variant="outline">
  <a
    href={`/syllabus/${slug}.pdf`}
    target="_blank"
    rel="noopener noreferrer"
    download
  >
    Download Syllabus
  </a>
</Button> */}
<DownloadSyllabusCTA slug={slug} />

      </div>
    </div>

   {/* RIGHT COURSE IMAGE */}
<div className="lg:col-span-3 relative flex justify-center mt-10 lg:mt-0">

  {/* Shadow Layer 2 (farthest) */}
  <div className="absolute right-6 top-6 w-full max-w-2xl h-[240px] md:h-[370px] rounded-2xl bg-primary/10" />

  {/* Shadow Layer 1 */}
  <div className="absolute right-3 top-3 w-full max-w-2xl h-[240px] md:h-[370px] rounded-2xl bg-primary/20" />

  {/* Main Image */}
  <div className="relative w-full max-w-2xl h-[240px] md:h-[370px] rounded-2xl overflow-hidden shadow-xl border border-border bg-secondary">
    <Image
      src={course.cardImage}
      alt={course.title}
      fill
      className="object-cover"
    />
  </div>

</div>


  </div>

  {/* ===== HERO META BAR ===== */}
<div className="relative z-30 -mb-16 mt-10 px-4 sm:px-6">
  <div
    className="mx-auto max-w-6xl rounded-2xl bg-background shadow-lg border border-border px-6 md:px-8 py-6"
  >


    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">

      {/* Duration */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Clock className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-muted-foreground">Duration</p>
          <p className="font-semibold">{course.duration}</p>
        </div>
      </div>

      {/* Skill Level */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <GraduationCap className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-muted-foreground">Skill Level</p>
          <p className="font-semibold">Beginner → Advanced</p>
        </div>
      </div>

      {/* Learning Mode */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Award className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-muted-foreground">Learning Mode</p>
          <p className="font-semibold">Instructor-Led</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
    <UserCheck className="h-5 w-5 text-primary" />
  </div>
  <div>
    <p className="text-muted-foreground">Mentorship</p>
    <p className="font-semibold">1-to-1 Support</p>
  </div>
</div>

    </div>
  </div>
</div>

</section>

<section className="pt-28 pb-20 md:pt-32 md:pb-24 bg-background">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

      {/* LEFT : COURSE OVERVIEW */}
<div ref={overviewRef} className="lg:col-span-7 animate-fade-up">    
       <h2 className="text-2xl md:text-3xl font-headline font-bold">
          Course Overview
        </h2>

        <div className="mt-8 max-w-prose text-muted-foreground leading-relaxed space-y-6">
          {course.overview.map((para, i) => (
            <p key={i} className="text-base">
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* RIGHT : ENROLL CARD */}
      <div className="lg:col-span-5 flex justify-end">
<div
  ref={enrollRef}
  className="sticky top-32 w-full max-w-sm rounded-2xl border border-border bg-background shadow-lg p-5 animate-fadeInUp"
>  <p className="text-xs uppercase tracking-wide text-muted-foreground">
    Course Fee
  </p>

  <p className="mt-2 text-3xl font-bold text-primary">
    ₹{course.fee}
    <span className="ml-1 text-sm font-normal text-muted-foreground">
      / Full Course
    </span>
  </p>

  <EnrollWithEnquiryModal courseTitle={course.title} />

  <div className="mt-4 space-y-2 text-sm">
    <p className="font-medium">This course includes:</p>

    <ul className="mt-3 space-y-3 text-sm">
      <li className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
          <Video className="h-4 w-4 text-primary" />
        </span>
        <span className="text-muted-foreground">85+ Video Lessons</span>
      </li>

      <li className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
          <Radio className="h-4 w-4 text-blue-600" />
        </span>
        <span className="text-muted-foreground">Live Class Access</span>
      </li>

      <li className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/10">
          <Download className="h-4 w-4 text-indigo-600" />
        </span>
        <span className="text-muted-foreground">Downloadable Resources</span>
      </li>

      <li className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/10">
          <Infinity className="h-4 w-4 text-orange-600" />
        </span>
        <span className="text-muted-foreground">Lifetime Access</span>
      </li>

      <li className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10">
          <Award className="h-4 w-4 text-emerald-600" />
        </span>
        <span className="text-muted-foreground">Certificate of Completion</span>
      </li>
    </ul>
  </div>
</div>


        
      </div>

    </div>
  </div>
</section>



{/* ================= COURSE SYLLABUS + SIDEBAR ================= */}
<section className="py-14 bg-secondary">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

      {/* ================= SYLLABUS ================= */}
      <div className="lg:col-span-8">

        <div className="bg-secondary/60 rounded-2xl p-6 md:p-8 h-[620px] flex flex-col">

          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-headline font-bold">
              Course Syllabus
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Step-by-step curriculum designed for strong fundamentals and
              job-ready skills.
            </p>
          </div>

          {/* Scrollable Accordion */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
           <Accordion type="single" collapsible className="space-y-4">
            {course.syllabus.map((module, i) => (
<AccordionItem
  key={i}
  value={`module-${i}`}
  className="border-none animate-fadeInUp"
  style={{ animationDelay: `${i * 80}ms` }}
><AccordionTrigger
  className="
    group
    w-full
    rounded-2xl
    border border-border
    bg-white
    px-6 py-5
    text-left

    transition-all duration-300 ease-out

    hover:-translate-y-[2px]
    hover:border-primary
    hover:shadow-[0_10px_30px_-12px_theme(colors.primary/40)]

    data-[state=open]:border-primary
    data-[state=open]:bg-primary/5
    data-[state=open]:shadow-[0_0_0_3px_theme(colors.primary/20)]

    no-underline hover:no-underline
  "
>
  <div className="flex flex-col">
    {/* Module line */}
 <span
    className="
      text-xs text-primary font-semibold uppercase tracking-wider
      transition-colors
      group-hover:text-primary
      data-[state=open]:text-primary
    "
  >     Module {i + 1}
    </span>

    {/* Title line (below) */}
 <span
    className="
      mt-1 text-base font-medium
      text-foreground
      transition-colors
      group-hover:text-primary
      data-[state=open]:text-primary
    "
  >      {module.title}
    </span>
  </div>
</AccordionTrigger>
                <AccordionContent className="bg-background rounded-xl px-6 py-4 mt-2">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {module.topics.map((topic, j) => (
                      <li key={j}>• {topic}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          </div>

        </div>
      </div>
     { /* left section */}

      <div className="lg:col-span-4 space-y-6">

        
      <div className="sticky top-32">
 <div className="
  w-full
  rounded-2xl
  border border-border
  bg-background
  shadow-lg
  p-6  "style={{
      backgroundImage: "url('/cta-bg.png')", // 🔁 your bg image
    }}
>

    {/* Icon */}
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 mb-4">
      <Award className="h-5 w-5 text-primary text-white" />
    </div>

    {/* Title */}
    <h3 className="text-lg font-headline font-semibold text-foreground text-white">
      Professional Certification
    </h3>

    {/* Subtitle */}
    <p className="mt-2 text-sm text-muted-foreground leading-relaxed text-white ">
      Get recognized by industry leaders with our
      professional certificate.
    </p>

    {/* Certificate Preview */}
    <div className="
      mt-5
      rounded-xl
      overflow-hidden
      border border-border
      bg-secondary/40
      p-3
    ">
      <Image
        src="/certificate.png"   // ✔ your certificate image
        alt="Certificate Preview"
        width={400}
        height={260}
        className="w-full object-contain rounded-md"
      />
    </div>

  </div>
</div>

  

        {/* Optional CTA */}
        <div className="rounded-2xl bg-primary text-primary-foreground p-6">
          <h4 className="font-semibold">
            Confused which course to choose?
          </h4>
          <p className="mt-2 text-sm opacity-90">
            Get guidance from our mentors.
          </p>
          <Button className="mt-4 w-full" variant="secondary">
            Talk to Mentor → <Phone className="h-4 w-4" />
    <a
      href="tel:+919860098343"
      className="hover:underline"
    >
      +91 98600 98343
    </a>
          </Button>
         
        </div>

      </div>

    </div>
  </div>
</section>

      {/* ================= DATA SCIENCE COURSE BENEFITS ================= */}
<section className="py-20 bg-gradient-to-b from-background to-secondary">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Header */}
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-headline font-bold">
       <span className="text-primary">Key Benefits </span>You’ll Gain from This Program      </h2>
      <p className="mt-4 text-lg text-muted-foreground">
        A carefully structured journey that transforms you from a learner
        into a confident, job-ready data professional.
      </p>
    </div>

    {/* Pipeline */}
<div
  ref={benefitsRef}
  className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-up"
>            {course.benefits.map((benefit, i) => (
              <div
                key={i}
                className="rounded-xl bg-background border p-6 shadow-sm"
              >
                <CheckCircle className="h-5 w-5 text-primary mb-3" />
                <h4 className="font-semibold">{benefit.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

    {/* Bottom Highlight */}
    <div className="mt-16 text-center">
      <p className="text-sm text-muted-foreground">
        By the end of the program, you won’t just understand data —
        <span className="text-primary font-medium">
          {" "}you’ll know how to apply it professionally.
        </span>
      </p>
    </div>

  </div>
</section>
{/* ================= WHY JOIN THIS PROGRAM ================= */}
<section className="bg-white py-16">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Heading */}
    <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">

        Why join this <span className="text-primary">{course.title} </span> program?
      </h2>
      <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
        Learn with confidence through a structured, practical, and career-focused approach.
      </p>
    </div>

    {/* Content */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      
      {/* Image */}
      <div className="flex justify-center">
        <img
          src="/data-science-vector-image.png"
          alt="Data Science Program"
          className="w-full max-w-xl md:max-w-2xl"
        />
      </div>

      {/* Points */}
       <div className="mt-10 space-y-5">
            {course.whyJoin.map((item, i) => (
              <div key={i} className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

    </div>
  </div>
</section>


       {/* Popular Courses Section */}
        <section id="courses" className="py-16 md:py-24 bg-secondary">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">
                Explore More Courses
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Hand-picked courses by our best instructors to kickstart your
                career.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.slice(0, 3).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild variant="outline">
                <Link href="/courses">View All Courses</Link>
              </Button>
            </div>
          </div>
        </section>
         {/* ================= STUDENT REVIEWS ================= */}
     {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">
                What Our Students Say
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Success stories from our alumni who have transformed their
                careers.
              </p>
            </div>
<div ref={testimonialRef} className="mt-12 animate-fade-up">
              <Carousel
                opts={{ align: 'start' }}
                className="w-full"
              >
                <CarouselContent>
                  {testimonials.map((testimonial) => (
                    <CarouselItem
                      key={testimonial.id}
                      className="md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="p-1 h-full">
                        <Card className="h-full flex flex-col justify-between">
                          <CardContent className="pt-6">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-5 w-5 text-accent fill-accent"
                                />
                              ))}
                            </div>
                            <blockquote className="mt-4 text-muted-foreground">
                              "{testimonial.quote}"
                            </blockquote>
                          </CardContent>
                          <CardHeader className="flex-row items-center gap-4">
                            <Image
                              src={testimonial.imageUrl}
                              alt={testimonial.name}
                              width={48}
                              height={48}
                              className="rounded-full object-cover"
                              data-ai-hint={testimonial.imageHint}
                            />
                            <div>
                              <p className="font-semibold">{testimonial.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {testimonial.course}
                              </p>
                            </div>
                          </CardHeader>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious variant="default" className="ml-12" />
                <CarouselNext variant="default" className="mr-12" />
              </Carousel>
            </div>
          </div>
        </section>
    </main>
  );
}
{/* <div className="rounded-2xl border border-border bg-background p-6">
          <h3 className="text-lg font-headline font-semibold">
            Related Courses
          </h3>

          <div className="mt-4 space-y-4">
            {[
              {
                title: "Full Stack Web Development",
                duration: "6 Months",
                image: "/full-stack5.png",
              },
              {
                title: "Machine Learning",
                duration: "5 Months",
                image: "/machine-learning.png",
              },
              {
                title: "Python for Data Analysis",
                duration: "3 Months",
                image: "/python.png",
              },
               {
          title: "Data Analytics",
          duration: "4 Months",
          image: "/data-analytics.png",
        },
            ].map((course, i) => (
              <Link
                key={i}
                href="/courses"
                className="group flex gap-4 rounded-xl bg-secondary/50 p-3 hover:bg-secondary transition"
              >
                <div className="relative h-16 w-20 rounded-lg overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium group-hover:text-primary">
                    {course.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {course.duration}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div> */}
