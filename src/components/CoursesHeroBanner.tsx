"use client";

import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import {
    Code2,
    Database,
    Cpu,
    BrainCircuit,
    Server,
} from "lucide-react";

const slides = [
    {
        title: "Generative AI & Machine Learning",
        subtitle: "Build intelligent systems for the future.",
        link: "/courses/artificial-intelligence",
    },
    {
        title: "Full Stack Development",
        subtitle: "Frontend. Backend. Deployment.",
        link: "/courses/full-stack-web-development",
    },
    {
        title: "Data Science & Analytics",
        subtitle: "Turn data into powerful decisions.",
        link: "/courses/data-science",
    },
];

export default function TechCoursesBanner() {
    return (
        <section className="relative w-full min-h-[220px] md:h-[250px] 
bg-gradient-to-br from-[#e6f4f5] via-white to-[#f0f7f8]">
            <div className="container mx-auto px-8 lg:px-12 max-w-7xl h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center h-full">

                    {/* ================= LEFT SIDE ================= */}

                    <div className="space-y-3">

                        {/* Heading */}
                        <div>
                            <h1 className="text-sm md:text-xl lg:text-3xl font-headline font-bold text-primary leading-tight">
                                Industry-Ready <span className="text-accent">IT Courses</span>
                            </h1>

                        </div>

                        {/* Slider */}
                        <Carousel
                            opts={{ loop: true }}
                            plugins={[
                                Autoplay({
                                    delay: 3500,
                                    stopOnInteraction: false,
                                }),
                            ]}
                        >
                            <CarouselContent>
                                {slides.map((slide, index) => (
                                    <CarouselItem key={index}>
                                        <div className="rounded-xl bg-gradient-to-r from-[#2F6F73] to-[#1e3a5f] text-white p-4 shadow-lg">

                                            <h3 className="text-sm md:text-base font-semibold">
                                                {slide.title}
                                            </h3>

                                            <p className="mt-1 text-xs text-white/80">
                                                {slide.subtitle}
                                            </p>

                                            <Button
                                                asChild
                                                size="sm"
                                                className="mt-3 bg-white text-primary hover:bg-white/90"
                                            >
                                                <Link href={slide.link}>
                                                    View Program
                                                </Link>
                                            </Button>

                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>

                    </div>

                    {/* ================= RIGHT SIDE ================= */}

                    <div className="flex flex-col justify-center space-y-3 h-full">

                        {/* Main Heading */}
                        <h2 className="text-lg md:text-xl lg:text-2xl font-headline font-bold text-primary leading-tight">
                            🎯 Career-Focused Learning Path
                        </h2>

                        <div className="space-y-1 text-xs md:text-sm text-muted-foreground">

                            <div className="flex items-center gap-2">
                                <span className="text-primary font-bold">✓</span>
                                <span>Expert-Led Practical Training</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-primary font-bold">✓</span>
                                <span>Real-World Case Studies</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-primary font-bold">✓</span>
                                <span>Interview & Resume Preparation</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-primary font-bold">✓</span>
                                <span>Industry-Driven Curriculum</span>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}