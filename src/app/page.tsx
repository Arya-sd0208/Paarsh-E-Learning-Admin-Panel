// 'use client';

// import Image from 'next/image';
// import { useInViewAnimation } from '@/hooks/useInViewAnimation';

// import CountUp from '@/components/CountUp';
// import { Users, Target } from 'lucide-react';

// import { motion } from "framer-motion";
// import {
//   Map,
//   UserCheck,
//   Laptop,
//   Briefcase,
// } from "lucide-react";
// import Link from 'next/link';
// import VideoSection from '@/components/VideoSection';
// import AutoCourseTabs from '@/components/AutoCourseTabs';
// import {
//   ArrowRight,
//   BookOpen,
//   Calendar,
//   GraduationCap,
//   HeartHandshake,
//   Newspaper,
//   Award,
//   Star,
// } from 'lucide-react';
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from '@/components/ui/carousel';
// import Autoplay from 'embla-carousel-autoplay';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { CourseCard } from '@/components/CourseCard';
// import {
//   courses,
//   testimonials,
//   blogPosts,
//   events,
//   heroSlides,
// } from '@/lib/data';

// const fadeUp = {
//   hidden: { opacity: 0, y: 24 },
//   visible: { opacity: 1, y: 0 },
// };

// const fadeLeft = {
//   hidden: { opacity: 0, x: -40, scale: 0.95 },
//   visible: { opacity: 1, x: 0, scale: 1 },
// };

// const staggerContainer = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.2,
//     },
//   },
// };

// export default function Home() {
//   const leftRef = useInViewAnimation<HTMLDivElement>();

//   return (
//     <div className="flex flex-col min-h-dvh">
//       <main className="flex-1">
//         {/* Hero Section */}
// <section className="relative w-full h-[45vh] sm:h-[65vh] md:h-[80vh]">
//           <Carousel
//             opts={{ loop: true }}
//             plugins={[Autoplay({ delay: 5000 })]}
//             className="w-full h-full"
//           >
//             <CarouselContent>
//               {heroSlides.map((slide) => (
//                 <CarouselItem key={slide.id}>
// <div className="relative h-[45vh] sm:h-[65vh] md:h-[80vh] w-full">
//                     <Image
//                       src={slide.imageUrl}
//                       alt={slide.alt}
//                       fill
//                       className="object-cover"
//                       data-ai-hint={slide.imageHint}
//                       priority={slide.id === 1}
//                     />
// <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent md:from-black/70 md:via-black/40" />
// <div className="absolute inset-0 flex flex-col items-center justify-end md:justify-center text-center text-white px-5 pb-12 md:p-4">
//                       <div className="max-w-4xl">
// <h1 className="font-headline font-bold drop-shadow-lg text-2xl sm:text-3xl md:text-6xl leading-snug">
//                           {slide.title}
//                         </h1>
// <p className="mt-3 text-sm sm:text-base md:text-xl max-w-md md:max-w-2xl mx-auto drop-shadow-md opacity-90">
//                           {slide.subtitle}
//                         </p>
// <Button asChild className="mt-6 md:mt-8 px-6 py-5 text-sm md:text-base" size="lg">
//                           <Link href="/courses">
//                             Explore Courses <ArrowRight className="ml-2" />
//                           </Link>
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//            <CarouselPrevious className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2" />
// <CarouselNext className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2" />
//           </Carousel>
//         </section>

//         {/* Popular Courses Section */}
//       <section id="courses" className="section-tight bg-secondary">
//   <div className="container mx-auto px-4 lg:px-10 xl:px-16 max-w-7xl">

//     <div className="animate-fade-up">

//       {/* Header */}
//       <div className="text-center max-w-3xl mx-auto">
//         <h2 className="text-3xl md:text-4xl font-headline font-bold">
//           Popular Courses
//         </h2>
//         <p className="mt-4 text-lg text-muted-foreground">
//           Hand-picked courses by our best instructors to kickstart your career.
//         </p>
//       </div>

//       {/* Slider */}
//       <div className="mt-12 relative">
//         <Carousel
//           opts={{ align: "start", loop: true }}
//           plugins={[
//             Autoplay({
//               delay: 3500,
//               stopOnInteraction: true,
//               stopOnMouseEnter: true,
//             }),
//           ]}
//         >
//           <CarouselContent className="-ml-4">
//             {courses.slice(0, 6).map((course) => (
//               <CarouselItem
//                 key={course.id}
//                 className="pl-4 basis-1/2 sm:basis-1/2 lg:basis-1/3"
//               >
//                 <CourseCard course={course} />
//               </CarouselItem>
//             ))}
//           </CarouselContent>

//           <CarouselPrevious className="-left-12 top-1/2 -translate-y-1/2" />
//           <CarouselNext className="-right-12 top-1/2 -translate-y-1/2" />
//         </Carousel>
//       </div>

//       {/* CTA */}
//       <div className="text-center mt-12">
//         <Button asChild variant="outline">
//           <Link href="/courses">View All Courses</Link>
//         </Button>
//       </div>

//     </div>
//   </div>
// </section>
// {/* ================= WHY CHOOSE US ================= */}
// <section
//   id="why-choose-us"
//   className="section-tight bg-gradient-to-br from-secondary via-background to-secondary"
// >
//   <div className="container mx-auto px-4 lg:px-10 xl:px-16 max-w-7xl">

//     <motion.div
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, margin: "-100px" }}
//       className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
//     >

//       {/* IMAGE SIDE */}
//       <motion.div
//         variants={fadeLeft}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="relative"
//       >
//         <div className="relative h-[420px] w-full rounded-2xl overflow-hidden shadow-lg">
//           <Image
//             src="/mock-interview.png"
//             alt="One-to-one learning at Paarsh E-Learning"
//             fill
//             className="object-cover"
//           />
//         </div>

//         {/* Decorative glow */}
//         <div className="absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-accent/10 blur-2xl -z-10" />
//       </motion.div>

//       {/* CONTENT SIDE */}
//       <motion.div variants={staggerContainer} className="relative">

//         <motion.h2
//           variants={fadeUp}
//           className="text-3xl md:text-4xl font-headline font-bold"
//         >
//           Why Choose{" "}
//           <span className="text-primary inline-block whitespace-nowrap">
//             Paarsh E-Learning?
//           </span>
//         </motion.h2>

//         <motion.p
//           variants={fadeUp}
//           className="mt-4 text-lg text-muted-foreground max-w-lg"
//         >
//           We focus on personalized learning and real career outcomes,
//           not crowded classrooms or generic content.
//         </motion.p>

//         <motion.div variants={staggerContainer} className="mt-10 space-y-8">

//           {/* FEATURE 1 */}
//           <motion.div
//             variants={fadeUp}
//             className="
//               group flex gap-5 items-start
//               rounded-2xl p-4
//               transition-colors duration-300
//               hover:bg-accent/5
//             "
//           >
//             <div
//               className="
//                 shrink-0 rounded-2xl p-4
//                 bg-primary/10
//                 transition-colors duration-300
//                 group-hover:bg-accent/15
//               "
//             >
//               <HeartHandshake className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />
//             </div>

//             <div>
//               <h4 className="text-lg font-semibold group-hover:text-accent transition-colors">
//                 One-to-One Mentorship
//               </h4>
//               <p className="mt-1 text-muted-foreground">
//                 Dedicated mentors guide you personally throughout your journey.
//               </p>
//             </div>
//           </motion.div>

//           {/* FEATURE 2 */}
//           <motion.div
//             variants={fadeUp}
//             className="
//               group flex gap-5 items-start
//               rounded-2xl p-4
//               transition-colors duration-300
//               hover:bg-accent/5
//             "
//           >
//             <div
//               className="
//                 shrink-0 rounded-2xl p-4
//                 bg-primary/10
//                 transition-colors duration-300
//                 group-hover:bg-accent/15
//               "
//             >
//               <GraduationCap className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />
//             </div>

//             <div>
//               <h4 className="text-lg font-semibold group-hover:text-accent transition-colors">
//                 Limited Seats
//               </h4>
//               <p className="mt-1 text-muted-foreground">
//                 Small batches ensure focus, clarity, and quality learning.
//               </p>
//             </div>
//           </motion.div>

//           {/* FEATURE 3 */}
//           <motion.div
//             variants={fadeUp}
//             className="
//               group flex gap-5 items-start
//               rounded-2xl p-4
//               transition-colors duration-300
//               hover:bg-accent/5
//             "
//           >
//             <div
//               className="
//                 shrink-0 rounded-2xl p-4
//                 bg-primary/10
//                 transition-colors duration-300
//                 group-hover:bg-accent/15
//               "
//             >
//               <Award className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />
//             </div>

//             <div>
//               <h4 className="text-lg font-semibold group-hover:text-accent transition-colors">
//                 Placement Focused
//               </h4>
//               <p className="mt-1 text-muted-foreground">
//                 Interview preparation, mock interviews, and structured support.
//               </p>
//             </div>
//           </motion.div>

//         </motion.div>
//       </motion.div>

//     </motion.div>
//   </div>
// </section>



// <section className="section-tight bg-background">
//   <div className="container mx-auto px-4 lg:px-10 xl:px-16 max-w-7xl">

//     <div className="animate-fade-up">

//       {/* Header */}
//       <div className="text-center max-w-3xl mx-auto">
//         <h2 className="text-3xl md:text-4xl font-headline font-bold">
//           Programs Designed for Your{" "}
//           <span className="text-primary">Career</span>
//         </h2>

//         <p className="mt-4 text-lg text-muted-foreground">
//           Choose a learning path tailored to your career goals
//           and current experience level.
//         </p>
//       </div>

//       {/* Tabs */}
//       <div className="mt-12">
//         <AutoCourseTabs courses={courses} />
//       </div>

//     </div>

//   </div>
// </section>


// <VideoSection/>

// {/* ================= STUDENT BENEFITS ================= */}
// <section className="relative section-tight overflow-hidden">

//   {/* Background Image */}
//   <div
//     className="absolute inset-0 bg-cover bg-center"
//     style={{
//       backgroundImage: "url('/benefits-bg.png')",
//     }}
//   />

//   {/* Overlay for readability */}
//   <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px]" />
//   <div className="relative container mx-auto px-4 lg:px-10 xl:px-16 max-w-7xl">

//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

//       {/* LEFT CONTENT */}
// <div ref={leftRef} className="max-w-xl animate-fade-up">
//         <h2 className="text-3xl md:text-4xl font-headline font-bold leading-tight">
//           Learning That Comes <br />
//           With <span className="text-primary">Real Benefits</span>
//         </h2>

//         <p className="mt-6 text-lg text-muted-foreground">
//           We guide students with structured learning, real projects,
//           and focused mentorship — designed for long-term careers.
//         </p>

//         <p className="mt-4 text-muted-foreground">
//           Every course is aligned with industry needs and hiring expectations.
//         </p>
//  <Link
//   href="/courses"
//   className="mt-8 inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
// >
//   Explore Programs
// </Link>

//       </div>
 
// {/* RIGHT BENEFITS */}
// <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl">

//   {[
//     {
//       title: "Career Roadmap",
//       desc: "Clear paths aligned with industry job roles.",
//       icon: Map,
//     },
//     {
//       title: "Personal Mentorship",
//       desc: "One-to-one guidance from experienced mentors.",
//       icon: UserCheck,
//     },
//     {
//       title: "Hands-on Projects",
//       desc: "Practical projects that build confidence.",
//       icon: Laptop,
//     },
//     {
//       title: "Interview Support",
//       desc: "Mock interviews & placement preparation.",
//       icon: Briefcase,
//     },
//   ].map((item, i) => {
//       const cardRef = useInViewAnimation<HTMLDivElement>();

//     const Icon = item.icon;
//     return (
// <div
//       ref={cardRef}
//       key={i}
//       className="
//         relative group
//         animate-fadeInUp
//         hover:-translate-y-2
//         transition-transform duration-300
//       "
//       style={{ animationDelay: `${i * 120}ms` }}
//     >
//         {/* Decorative Background Squares */}
//         <div className="absolute -top-2 -left-2 h-full w-full rounded-2xl bg-primary/5" />
//         <div className="absolute -bottom-2 -right-2 h-full w-full rounded-2xl bg-primary/10" />

//         {/* Card */}
//         <div className="relative z-10 rounded-2xl border border-border bg-background px-6 py-6 shadow-sm transition group-hover:shadow-md">

//           {/* ICON */}
// <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-transform duration-300 group-hover:scale-110">
//             <Icon className="h-5 w-5 text-primary" />
//           </div>

//           <h4 className="text-base font-semibold">
//             {item.title}
//           </h4>

//           <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
//             {item.desc}
//           </p>

//         </div>

//       </div>
//     );
//   })}

// </div>


//     </div>
//   </div>
// </section>  

//  {/* Let’s Get In Touch */}
// <section className="relative py-8 md:py-10 mx-6 md:mx-10 mt-16 md:mt-20">
//   {/* Background Image */}
//   <div
//     className="absolute inset-0 rounded-[24px] bg-cover bg-center"
//     style={{
//       backgroundImage: "url('/cta-bg.png')",
//     }}
//   />

//   {/* Overlay */}
//   <div className="absolute inset-0 rounded-[24px] bg-black/10" />

//   <div className="relative container mx-auto px-4 md:px-6 text-white">
//     <div className="max-w-3xl">

//       {/* Heading */}
//       <h2 className="text-2xl md:text-3xl font-headline font-bold">
//         Let’s Get In Touch
//       </h2>

//       {/* Description */}
//       <p className="mt-3 max-w-2xl text-white/90 text-sm md:text-base">
//         Get expert guidance on courses, career paths, interview preparation,
//         and placement support tailored for you.
//       </p>

//       {/* Stats */}
//       <div className="mt-6 flex flex-wrap gap-6">
//         <div>
//           <p className="text-2xl font-bold text-[#D6B57C]">500+</p>
//           <p className="text-xs text-white/80">Students Guided</p>
//         </div>

//         <div>
//           <p className="text-2xl font-bold text-[#D6B57C]">1:1</p>
//           <p className="text-xs text-white/80">Mentorship Model</p>
//         </div>

//         <div>
//           <p className="text-2xl font-bold text-[#D6B57C]">100%</p>
//           <p className="text-xs text-white/80">Career Focused</p>
//         </div>
//       </div>

//       {/* CTAs */}
//       <div className="mt-6 flex flex-col sm:flex-row gap-3">
//         <a
//           href="tel:+919860098343"
//           className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#2F6F73] hover:bg-white/90 transition"
//         >
//           📞 Call: +91 986 009 8343
//         </a>
      
//         <Link
//   href="/contact-us"
//   className="inline-flex items-center justify-center rounded-lg border border-white/70 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
// >
//   Get in Touch
// </Link>
//       </div>

//     </div>
//   </div>
// </section>

// {/* ================= OUR ACHIEVEMENTS (PARALLAX) ================= */}
// <section
//   id="our-achievements"
//   className="relative bg-fixed bg-center bg-cover text-white mt-16 md:mt-20"
//   style={{ backgroundImage: "url('/achievements.png')" }}
// >
//   {/* Overlay */}
//   <div className="absolute inset-0 bg-black/65" />

//   <div className="relative container mx-auto px-4 py-20">

//     {/* Header */}
//     <div className="text-center max-w-3xl mx-auto">
//       <h2 className="text-3xl md:text-4xl font-headline font-bold">
//         Our Achievements
//       </h2>
//       <p className="mt-4 text-base md:text-lg text-white/80">
//         Milestones that reflect our commitment to quality learning
//         and real career success.
//       </p>
//     </div>

//     {/* Stats */}
//     <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">

//       {[
//         {
//           value: 500,
//           suffix: '+',
//           label: 'Students Trained',
//           icon: GraduationCap,
//         },
//         {
//           value: 50,
//           suffix: '+',
//           label: 'Expert Mentors',
//           icon: Users,
//         },
//         {
//           value: 300,
//           suffix: '+',
//           label: 'Interview Calls',
//           icon: Briefcase,
//         },
//         {
//           value: 100,
//           suffix: '%',
//           label: 'Career Focused Learning',
//           icon: Target,
//         },
//       ].map((stat, i) => (
//         <div
//           key={i}
//           className="
//             group
//             rounded-3xl
//             bg-white/10
//             backdrop-blur-md
//             p-6 md:p-8
//             text-center
//             transition-all
//             duration-300
//             hover:-translate-y-2
//             hover:bg-white/15
//           "
//           style={{ animationDelay: `${i * 120}ms` }}
//         >
//           {/* Icon */}
//           <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
//             <stat.icon className="h-6 w-6 text-[#F4A261]" />
//           </div>

//           {/* Number */}
//           <p className="text-4xl md:text-5xl font-bold text-[#F4A261]">
//             <CountUp end={stat.value} suffix={stat.suffix} />
//           </p>

//           {/* Label */}
//           <p className="mt-2 text-sm text-white/80">
//             {stat.label}
//           </p>
//         </div>
//       ))}
//     </div>

//   </div>
// </section>


 

//         {/* Upcoming Events Section */}
// <section className="py-20 bg-background overflow-hidden">
//   <div className="container mx-auto px-4">

//     {/* Heading */}
//     <div className="text-center max-w-3xl mx-auto">
//       <h2 className="text-3xl md:text-4xl font-headline font-bold">
//         Powering Innovation with a Modern Tech Stack
//       </h2>
//       <p className="mt-4 text-lg text-muted-foreground">
//         We leverage cutting-edge technologies to build scalable,
//         future-ready solutions.
//       </p>
//     </div>

//     {/* ================= ROW 1 (LEFT → RIGHT) ================= */}
//     <div className="relative mt-16 overflow-hidden">
// <div className="flex gap-16 animate-marquee">

//         {[
//           { name: "typescript", file: "typescript-original.svg" },
//           { name: "python", file: "python-original.svg" },
//           { name: "django", file: "django-plain.svg" }, // FIXED
//           { name: "nodejs", file: "nodejs-original.svg" },
//           { name: "postgresql", file: "postgresql-original.svg" },
//           { name: "mongodb", file: "mongodb-original.svg" },
//           { name: "docker", file: "docker-original.svg" },
//           { name: "react", file: "react-original.svg" },
//           { name: "nextjs", file: "nextjs-original.svg" },
//           { name: "tailwindcss", file: "tailwindcss-original.svg" },
//         ].map((icon, i) => (
//           <img
//             key={i}
//             src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon.name}/${icon.file}`}
//             alt={icon.name}
//             className="h-12 w-12 hover:scale-110 transition-transform"
//           />
//         ))}

//         {/* duplicate for smooth loop */}
//         {[
//           { name: "typescript", file: "typescript-original.svg" },
//           { name: "python", file: "python-original.svg" },
//           { name: "django", file: "django-plain.svg" },
//           { name: "nodejs", file: "nodejs-original.svg" },
//           { name: "postgresql", file: "postgresql-original.svg" },
//           { name: "mongodb", file: "mongodb-original.svg" },
//           { name: "docker", file: "docker-original.svg" },
//           { name: "react", file: "react-original.svg" },
//           { name: "nextjs", file: "nextjs-original.svg" },
//           { name: "tailwindcss", file: "tailwindcss-original.svg" },
//         ].map((icon, i) => (
//           <img
//             key={`dup-${i}`}
//             src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon.name}/${icon.file}`}
//             alt={icon.name}
//             className="h-12 w-12 hover:scale-110 transition-transform"
//           />
//         ))}

//       </div>
//     </div>

//     {/* ================= ROW 2 (RIGHT → LEFT) ================= */}
//     <div className="relative mt-12 overflow-hidden">
//       <div className="flex w-max gap-16 animate-marquee-reverse">

//         {[
//           { name: "java", file: "java-original.svg" },
//           { name: "spring", file: "spring-original.svg" },
//           { name: "kotlin", file: "kotlin-original.svg" },
//           { name: "kubernetes", file: "kubernetes-original.svg" },
//           { name: "googlecloud", file: "googlecloud-original.svg" },
//           { name: "firebase", file: "firebase-plain.svg" }, // FIXED
//           { name: "javascript", file: "javascript-original.svg" },
//           { name: "python", file: "python-original.svg" },
//           { name: "typescript", file: "typescript-original.svg" },
//         ].map((icon, i) => (
//           <img
//             key={i}
//             src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon.name}/${icon.file}`}
//             alt={icon.name}
//             className="h-12 w-12 hover:scale-110 transition-transform"
//           />
//         ))}

//         {/* duplicate */}
//         {[
//           { name: "java", file: "java-original.svg" },
//           { name: "spring", file: "spring-original.svg" },
//           { name: "kotlin", file: "kotlin-original.svg" },
//           { name: "kubernetes", file: "kubernetes-original.svg" },
//           { name: "googlecloud", file: "googlecloud-original.svg" },
//           { name: "firebase", file: "firebase-plain.svg" },
//           { name: "javascript", file: "javascript-original.svg" },
//           { name: "python", file: "python-original.svg" },
//           { name: "typescript", file: "typescript-original.svg" },
//         ].map((icon, i) => (
//           <img
//             key={`dup2-${i}`}
//             src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon.name}/${icon.file}`}
//             alt={icon.name}
//             className="h-12 w-12 hover:scale-110 transition-transform"
//           />
//         ))}

//       </div>
//     </div>

//   </div>
// </section>


//         {/* Testimonials Section */}
//         <section id="testimonials" className="section-tight">
//           <div className="container mx-auto px-4">
//             <div className="text-center max-w-3xl mx-auto">
//               <h2 className="text-3xl md:text-4xl font-headline font-bold">
//                 What Our Students Say
//               </h2>
//               <p className="mt-4 text-lg text-muted-foreground">
//                 Success stories from our alumni who have transformed their
//                 careers.
//               </p>
//             </div>
//             <div className="mt-12">
//               <Carousel
//                 opts={{ align: 'start' }}
//                 className="w-full"
//               >
//                 <CarouselContent>
//                   {testimonials.map((testimonial) => (
//                     <CarouselItem
//                       key={testimonial.id}
//                       className="md:basis-1/2 lg:basis-1/3"
//                     >
//                       <div className="p-1 h-full">
//                         <Card className="h-full flex flex-col justify-between">
//                           <CardContent className="pt-6">
//                             <div className="flex">
//                               {[...Array(5)].map((_, i) => (
//                                 <Star
//                                   key={i}
//                                   className="h-5 w-5 text-accent fill-accent"
//                                 />
//                               ))}
//                             </div>
//                             <blockquote className="mt-4 text-muted-foreground">
//                               "{testimonial.quote}"
//                             </blockquote>
//                           </CardContent>
//                           <CardHeader className="flex-row items-center gap-4">
//                             <Image
//                               src={testimonial.imageUrl}
//                               alt={testimonial.name}
//                               width={48}
//                               height={48}
//                               className="rounded-full object-cover"
//                               data-ai-hint={testimonial.imageHint}
//                             />
//                             <div>
//                               <p className="font-semibold">{testimonial.name}</p>
//                               <p className="text-sm text-muted-foreground">
//                                 {testimonial.course}
//                               </p>
//                             </div>
//                           </CardHeader>
//                         </Card>
//                       </div>
//                     </CarouselItem>
//                   ))}
//                 </CarouselContent>
//                 <CarouselPrevious variant="default" className="ml-12" />
//                 <CarouselNext variant="default" className="mr-12" />
//               </Carousel>
//             </div>
//           </div>
//         </section>
        
// <section className="section-compact bg-background pb-12 md:pb-16">
//   <div className="container mx-auto px-4">

//     {/* Header */}
//     <div className="text-center max-w-3xl mx-auto">
//       <h2 className="text-3xl md:text-4xl font-headline font-bold">
//         Our Industry Partners
//       </h2>
//       <p className="mt-4 text-lg text-muted-foreground">
//         Collaborating with companies that value skilled professionals.
//       </p>
//     </div>

//     {/* Logos - One Line */}
//     <div className="mt-12 overflow-x-auto scrollbar-hide">
//       <div className="flex items-center gap-20 min-w-max px-6">

//         {[
//           {
//             name: "Google",
//             logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
//           },
//           {
//             name: "Microsoft",
//             logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
//           },
//           {
//             name: "Amazon",
//             logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
//           },
//           {
//             name: "Infosys",
//             logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
//           },
//           {
//             name: "Wipro",
//             logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
//           },
//           {
//             name: "Accenture",
//             logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
//           },
//           {
//             name: "IBM",
//             logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
//           },
//         ].map((company, i) => (
//           <div
//             key={i}
//             className="flex items-center justify-center shrink-0"
//           >
//             <img
//               src={company.logo}
//               alt={company.name}
// className="h-9 md:h-10 object-contain"
//               loading="lazy"
//             />
//           </div>
//         ))}

//       </div>
//     </div>

//   </div>
// </section>

//       </main>
//     </div>  
//   );
// }













'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import TestimonialModal from "@/components/TestimonialFormModal";

import CountUp from '@/components/CountUp';
import { Users, Target } from 'lucide-react';

import { motion } from "framer-motion";
import {
  Map,
  UserCheck,
  Laptop,
  Briefcase,
} from "lucide-react";
import Link from 'next/link';
import VideoSection from '@/components/VideoSection';
import AutoCourseTabs from '@/components/AutoCourseTabs';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  GraduationCap,
  HeartHandshake,
  Newspaper,
  Award,
  Star,
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CourseCard } from '@/components/CourseCard';
import {
  courses,
  testimonials,
  blogPosts,
  events,
  heroSlides,
} from '@/lib/data';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Home() {
  const leftRef = useInViewAnimation<HTMLDivElement>();
  const [liveTestimonials, setLiveTestimonials] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTestimonials = () => {
    fetch("/api/testimonial")
      .then((res) => res.json())
      .then((data) => {
        // Handle both formats
        const fetchedData = Array.isArray(data) ? data : data.data;
        if (Array.isArray(fetchedData) && fetchedData.length > 0) {
          setLiveTestimonials(fetchedData);
        } else {
          setLiveTestimonials(testimonials);
        }
      })
      .catch(() => setLiveTestimonials(testimonials));
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[45vh] sm:h-[65vh] md:h-[80vh]">
          <Carousel
            opts={{ loop: true }}
            plugins={[Autoplay({ delay: 5000 })]}
            className="w-full h-full"
          >
            <CarouselContent>
              {heroSlides.map((slide) => (
                <CarouselItem key={slide.id}>
                  <div className="relative h-[45vh] sm:h-[65vh] md:h-[80vh] w-full">
                    <Image
                      src={slide.imageUrl}
                      alt={slide.alt}
                      fill
                      className="object-cover"
                      data-ai-hint={slide.imageHint}
                      priority={slide.id === 1}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent md:from-black/70 md:via-black/40" />
                    <div className="absolute inset-0 flex flex-col items-center justify-end md:justify-center text-center text-white px-5 pb-12 md:p-4">
                      <div className="max-w-4xl">
                        <h1 className="font-headline font-bold drop-shadow-lg text-2xl sm:text-3xl md:text-6xl leading-snug">
                          {slide.title}
                        </h1>
                        <p className="mt-3 text-sm sm:text-base md:text-xl max-w-md md:max-w-2xl mx-auto drop-shadow-md opacity-90">
                          {slide.subtitle}
                        </p>
                        <Button asChild className="mt-6 md:mt-8 px-6 py-5 text-sm md:text-base" size="lg">
                          <Link href="/courses">
                            Explore Courses <ArrowRight className="ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2" />
            <CarouselNext className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2" />
          </Carousel>
        </section>

        {/* Popular Courses Section */}
        <section id="courses" className="section-tight bg-secondary">
          <div className="container mx-auto px-4 lg:px-10 xl:px-16 max-w-7xl">

            <div className="animate-fade-up">

              {/* Header */}
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">
                  Popular Courses
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Hand-picked courses by our best instructors to kickstart your career.
                </p>
              </div>

              {/* Slider */}
              <div className="mt-12 relative">
                <Carousel
                  opts={{ align: "start", loop: true }}
                  plugins={[
                    Autoplay({
                      delay: 3500,
                      stopOnInteraction: true,
                      stopOnMouseEnter: true,
                    }),
                  ]}
                >
                  <CarouselContent className="-ml-4">
                    {courses.slice(0, 6).map((course) => (
                      <CarouselItem
                        key={course.id}
                        className="pl-4 basis-1/2 sm:basis-1/2 lg:basis-1/3"
                      >
                        <CourseCard course={course} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <CarouselPrevious className="-left-12 top-1/2 -translate-y-1/2" />
                  <CarouselNext className="-right-12 top-1/2 -translate-y-1/2" />
                </Carousel>
              </div>

              {/* CTA */}
              <div className="text-center mt-12">
                <Button asChild variant="outline">
                  <Link href="/courses">View All Courses</Link>
                </Button>
              </div>

            </div>
          </div>
        </section>
        {/* ================= WHY CHOOSE US ================= */}
        <section
          id="why-choose-us"
          className="section-tight bg-gradient-to-br from-secondary via-background to-secondary"
        >
          <div className="container mx-auto px-4 lg:px-10 xl:px-16 max-w-7xl">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >

              {/* IMAGE SIDE */}
              <motion.div
                variants={fadeLeft}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative"
              >
                <div className="relative h-[420px] w-full rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/mock-interview.png"
                    alt="One-to-one learning at Paarsh E-Learning"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Decorative glow */}
                <div className="absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-accent/10 blur-2xl -z-10" />
              </motion.div>

              {/* CONTENT SIDE */}
              <motion.div variants={staggerContainer} className="relative">

                <motion.h2
                  variants={fadeUp}
                  className="text-3xl md:text-4xl font-headline font-bold"
                >
                  Why Choose{" "}
                  <span className="text-primary inline-block whitespace-nowrap">
                    Paarsh E-Learning?
                  </span>
                </motion.h2>

                <motion.p
                  variants={fadeUp}
                  className="mt-4 text-lg text-muted-foreground max-w-lg"
                >
                  We focus on personalized learning and real career outcomes,
                  not crowded classrooms or generic content.
                </motion.p>

                <motion.div variants={staggerContainer} className="mt-10 space-y-8">

                  {/* FEATURE 1 */}
                  <motion.div
                    variants={fadeUp}
                    className="
              group flex gap-5 items-start
              rounded-2xl p-4
              transition-colors duration-300
              hover:bg-accent/5
            "
                  >
                    <div
                      className="
                shrink-0 rounded-2xl p-4
                bg-primary/10
                transition-colors duration-300
                group-hover:bg-accent/15
              "
                    >
                      <HeartHandshake className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold group-hover:text-accent transition-colors">
                        One-to-One Mentorship
                      </h4>
                      <p className="mt-1 text-muted-foreground">
                        Dedicated mentors guide you personally throughout your journey.
                      </p>
                    </div>
                  </motion.div>

                  {/* FEATURE 2 */}
                  <motion.div
                    variants={fadeUp}
                    className="
              group flex gap-5 items-start
              rounded-2xl p-4
              transition-colors duration-300
              hover:bg-accent/5
            "
                  >
                    <div
                      className="
                shrink-0 rounded-2xl p-4
                bg-primary/10
                transition-colors duration-300
                group-hover:bg-accent/15
              "
                    >
                      <GraduationCap className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold group-hover:text-accent transition-colors">
                        Limited Seats
                      </h4>
                      <p className="mt-1 text-muted-foreground">
                        Small batches ensure focus, clarity, and quality learning.
                      </p>
                    </div>
                  </motion.div>

                  {/* FEATURE 3 */}
                  <motion.div
                    variants={fadeUp}
                    className="
              group flex gap-5 items-start
              rounded-2xl p-4
              transition-colors duration-300
              hover:bg-accent/5
            "
                  >
                    <div
                      className="
                shrink-0 rounded-2xl p-4
                bg-primary/10
                transition-colors duration-300
                group-hover:bg-accent/15
              "
                    >
                      <Award className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold group-hover:text-accent transition-colors">
                        Placement Focused
                      </h4>
                      <p className="mt-1 text-muted-foreground">
                        Interview preparation, mock interviews, and structured support.
                      </p>
                    </div>
                  </motion.div>

                </motion.div>
              </motion.div>

            </motion.div>
          </div>
        </section>



        <section className="section-tight bg-background">
          <div className="container mx-auto px-4 lg:px-10 xl:px-16 max-w-7xl">

            <div className="animate-fade-up">

              {/* Header */}
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">
                  Programs Designed for Your{" "}
                  <span className="text-primary">Career</span>
                </h2>

                <p className="mt-4 text-lg text-muted-foreground">
                  Choose a learning path tailored to your career goals
                  and current experience level.
                </p>
              </div>

              {/* Tabs */}
              <div className="mt-12">
                <AutoCourseTabs courses={courses} />
              </div>

            </div>

          </div>
        </section>


        <VideoSection />

        {/* ================= STUDENT BENEFITS ================= */}
        <section className="relative section-tight overflow-hidden">

          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/benefits-bg.png')",
            }}
          />

          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px]" />
          <div className="relative container mx-auto px-4 lg:px-10 xl:px-16 max-w-7xl">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* LEFT CONTENT */}
              <div ref={leftRef} className="max-w-xl animate-fade-up">
                <h2 className="text-3xl md:text-4xl font-headline font-bold leading-tight">
                  Learning That Comes <br />
                  With <span className="text-primary">Real Benefits</span>
                </h2>

                <p className="mt-6 text-lg text-muted-foreground">
                  We guide students with structured learning, real projects,
                  and focused mentorship — designed for long-term careers.
                </p>

                <p className="mt-4 text-muted-foreground">
                  Every course is aligned with industry needs and hiring expectations.
                </p>
                <Link
                  href="/courses"
                  className="mt-8 inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
                >
                  Explore Programs
                </Link>

              </div>

              {/* RIGHT BENEFITS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl">

                {[
                  {
                    title: "Career Roadmap",
                    desc: "Clear paths aligned with industry job roles.",
                    icon: Map,
                  },
                  {
                    title: "Personal Mentorship",
                    desc: "One-to-one guidance from experienced mentors.",
                    icon: UserCheck,
                  },
                  {
                    title: "Hands-on Projects",
                    desc: "Practical projects that build confidence.",
                    icon: Laptop,
                  },
                  {
                    title: "Interview Support",
                    desc: "Mock interviews & placement preparation.",
                    icon: Briefcase,
                  },
                ].map((item, i) => {
                  const cardRef = useInViewAnimation<HTMLDivElement>();

                  const Icon = item.icon;
                  return (
                    <div
                      ref={cardRef}
                      key={i}
                      className="
        relative group
        animate-fadeInUp
        hover:-translate-y-2
        transition-transform duration-300
      "
                      style={{ animationDelay: `${i * 120}ms` }}
                    >
                      {/* Decorative Background Squares */}
                      <div className="absolute -top-2 -left-2 h-full w-full rounded-2xl bg-primary/5" />
                      <div className="absolute -bottom-2 -right-2 h-full w-full rounded-2xl bg-primary/10" />

                      {/* Card */}
                      <div className="relative z-10 rounded-2xl border border-border bg-background px-6 py-6 shadow-sm transition group-hover:shadow-md">

                        {/* ICON */}
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>

                        <h4 className="text-base font-semibold">
                          {item.title}
                        </h4>

                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>

                      </div>

                    </div>
                  );
                })}

              </div>


            </div>
          </div>
        </section>

        {/* Let’s Get In Touch */}
        <section className="relative py-8 md:py-10 mx-6 md:mx-10 mt-16 md:mt-20">
          {/* Background Image */}
          <div
            className="absolute inset-0 rounded-[24px] bg-cover bg-center"
            style={{
              backgroundImage: "url('/cta-bg.png')",
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 rounded-[24px] bg-black/10" />

          <div className="relative container mx-auto px-4 md:px-6 text-white">
            <div className="max-w-3xl">

              {/* Heading */}
              <h2 className="text-2xl md:text-3xl font-headline font-bold">
                Let’s Get In Touch
              </h2>

              {/* Description */}
              <p className="mt-3 max-w-2xl text-white/90 text-sm md:text-base">
                Get expert guidance on courses, career paths, interview preparation,
                and placement support tailored for you.
              </p>

              {/* Stats */}
              <div className="mt-6 flex flex-wrap gap-6">
                <div>
                  <p className="text-2xl font-bold text-[#D6B57C]">500+</p>
                  <p className="text-xs text-white/80">Students Guided</p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-[#D6B57C]">1:1</p>
                  <p className="text-xs text-white/80">Mentorship Model</p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-[#D6B57C]">100%</p>
                  <p className="text-xs text-white/80">Career Focused</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+919860098343"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#2F6F73] hover:bg-white/90 transition"
                >
                  📞 Call: +91 986 009 8343
                </a>

                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center rounded-lg border border-white/70 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
                >
                  Get in Touch
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* ================= OUR ACHIEVEMENTS (PARALLAX) ================= */}
        <section
          id="our-achievements"
          className="relative bg-fixed bg-center bg-cover text-white mt-16 md:mt-20"
          style={{ backgroundImage: "url('/achievements.png')" }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/65" />

          <div className="relative container mx-auto px-4 py-20">

            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">
                Our Achievements
              </h2>
              <p className="mt-4 text-base md:text-lg text-white/80">
                Milestones that reflect our commitment to quality learning
                and real career success.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">

              {[
                {
                  value: 500,
                  suffix: '+',
                  label: 'Students Trained',
                  icon: GraduationCap,
                },
                {
                  value: 50,
                  suffix: '+',
                  label: 'Expert Mentors',
                  icon: Users,
                },
                {
                  value: 300,
                  suffix: '+',
                  label: 'Interview Calls',
                  icon: Briefcase,
                },
                {
                  value: 100,
                  suffix: '%',
                  label: 'Career Focused Learning',
                  icon: Target,
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="
            group
            rounded-3xl
            bg-white/10
            backdrop-blur-md
            p-6 md:p-8
            text-center
            transition-all
            duration-300
            hover:-translate-y-2
            hover:bg-white/15
          "
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  {/* Icon */}
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
                    <stat.icon className="h-6 w-6 text-[#F4A261]" />
                  </div>

                  {/* Number */}
                  <p className="text-4xl md:text-5xl font-bold text-[#F4A261]">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </p>

                  {/* Label */}
                  <p className="mt-2 text-sm text-white/80">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>




        {/* Upcoming Events Section */}
        <section className="py-20 bg-background overflow-hidden">
          <div className="container mx-auto px-4">

            {/* Heading */}
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">
                Powering Innovation with a Modern Tech Stack
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We leverage cutting-edge technologies to build scalable,
                future-ready solutions.
              </p>
            </div>

            {/* ================= ROW 1 (LEFT → RIGHT) ================= */}
            <div className="relative mt-16 overflow-hidden">
              <div className="flex gap-16 animate-marquee">

                {[
                  { name: "typescript", file: "typescript-original.svg" },
                  { name: "python", file: "python-original.svg" },
                  { name: "django", file: "django-plain.svg" }, // FIXED
                  { name: "nodejs", file: "nodejs-original.svg" },
                  { name: "postgresql", file: "postgresql-original.svg" },
                  { name: "mongodb", file: "mongodb-original.svg" },
                  { name: "docker", file: "docker-original.svg" },
                  { name: "react", file: "react-original.svg" },
                  { name: "nextjs", file: "nextjs-original.svg" },
                  { name: "tailwindcss", file: "tailwindcss-original.svg" },
                ].map((icon, i) => (
                  <img
                    key={i}
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon.name}/${icon.file}`}
                    alt={icon.name}
                    className="h-12 w-12 hover:scale-110 transition-transform"
                  />
                ))}

                {/* duplicate for smooth loop */}
                {[
                  { name: "typescript", file: "typescript-original.svg" },
                  { name: "python", file: "python-original.svg" },
                  { name: "django", file: "django-plain.svg" },
                  { name: "nodejs", file: "nodejs-original.svg" },
                  { name: "postgresql", file: "postgresql-original.svg" },
                  { name: "mongodb", file: "mongodb-original.svg" },
                  { name: "docker", file: "docker-original.svg" },
                  { name: "react", file: "react-original.svg" },
                  { name: "nextjs", file: "nextjs-original.svg" },
                  { name: "tailwindcss", file: "tailwindcss-original.svg" },
                ].map((icon, i) => (
                  <img
                    key={`dup-${i}`}
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon.name}/${icon.file}`}
                    alt={icon.name}
                    className="h-12 w-12 hover:scale-110 transition-transform"
                  />
                ))}

              </div>
            </div>

            {/* ================= ROW 2 (RIGHT → LEFT) ================= */}
            <div className="relative mt-12 overflow-hidden">
              <div className="flex w-max gap-16 animate-marquee-reverse">

                {[
                  { name: "java", file: "java-original.svg" },
                  { name: "spring", file: "spring-original.svg" },
                  { name: "kotlin", file: "kotlin-original.svg" },
                  { name: "kubernetes", file: "kubernetes-original.svg" },
                  { name: "googlecloud", file: "googlecloud-original.svg" },
                  { name: "firebase", file: "firebase-plain.svg" }, // FIXED
                  { name: "javascript", file: "javascript-original.svg" },
                  { name: "python", file: "python-original.svg" },
                  { name: "typescript", file: "typescript-original.svg" },
                ].map((icon, i) => (
                  <img
                    key={i}
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon.name}/${icon.file}`}
                    alt={icon.name}
                    className="h-12 w-12 hover:scale-110 transition-transform"
                  />
                ))}

                {/* duplicate */}
                {[
                  { name: "java", file: "java-original.svg" },
                  { name: "spring", file: "spring-original.svg" },
                  { name: "kotlin", file: "kotlin-original.svg" },
                  { name: "kubernetes", file: "kubernetes-original.svg" },
                  { name: "googlecloud", file: "googlecloud-original.svg" },
                  { name: "firebase", file: "firebase-plain.svg" },
                  { name: "javascript", file: "javascript-original.svg" },
                  { name: "python", file: "python-original.svg" },
                  { name: "typescript", file: "typescript-original.svg" },
                ].map((icon, i) => (
                  <img
                    key={`dup2-${i}`}
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon.name}/${icon.file}`}
                    alt={icon.name}
                    className="h-12 w-12 hover:scale-110 transition-transform"
                  />
                ))}

              </div>
            </div>

          </div>
        </section>


        {/* testimonial Section */}
        <section id="testimonial" className="section-tight">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
              <div className="text-center md:text-left max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">
                  What Our Students Say
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Success stories from our alumni who have transformed their careers.
                </p>
              </div>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="rounded-full px-8 py-6 h-auto text-lg shadow-lg hover:scale-105 transition active:scale-95"
              >
                Share Your Success Story
              </Button>
            </div>

            <TestimonialModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSuccess={fetchTestimonials}
            />
            <div className="mt-12">
              <Carousel
                opts={{ align: 'start' }}
                className="w-full"
              >
                <CarouselContent>
                  {liveTestimonials.map((testimonial: any, index: number) => (
                    <CarouselItem
                      key={testimonial._id || index}
                      className="md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="p-1 h-full">
                        <Card className="h-full flex flex-col justify-between">
                          <CardContent className="pt-6">
                            <div className="flex">
                              {[...Array(testimonial.rating || 5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-5 w-5 text-accent fill-accent"
                                />
                              ))}
                            </div>
                            <blockquote className="mt-4 text-muted-foreground">
                              "{testimonial.message || testimonial.quote}"
                            </blockquote>
                          </CardContent>
                          <CardHeader className="flex-row items-center gap-4">
                            <Image
                              src={testimonial.imageUrl || "/user.png"}
                              alt={testimonial.name}
                              width={48}
                              height={48}
                              className="rounded-full object-cover"
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

        <section className="section-compact bg-background pb-12 md:pb-16">
          <div className="container mx-auto px-4">

            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">
                Our Industry Partners
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Collaborating with companies that value skilled professionals.
              </p>
            </div>

            {/* Logos - One Line */}
            <div className="mt-12 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-20 min-w-max px-6">

                {[
                  {
                    name: "Google",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
                  },
                  {
                    name: "Microsoft",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
                  },
                  {
                    name: "Amazon",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
                  },
                  {
                    name: "Infosys",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
                  },
                  {
                    name: "Wipro",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
                  },
                  {
                    name: "Accenture",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
                  },
                  {
                    name: "IBM",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
                  },
                ].map((company, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center shrink-0"
                  >
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-9 md:h-10 object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}

              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}


