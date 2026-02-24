import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { GraduationCap, Users, Star, Briefcase, Award, ArrowRight } from 'lucide-react';
import { connectDB } from "@/lib/db";
import Teacher from "@/models/Teachers";

async function getTeachers() {
    await connectDB();
    const teachers = await Teacher.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(teachers));
}

export default async function TeachersPage() {
    const teachers = await getTeachers();

    return (
        <div className="bg-secondary/30 py-16 md:py-24 min-h-screen">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-headline font-bold text-[#2C4276]">Meet Our Expert Instructors</h1>
                    <p className="mt-4 text-lg text-muted-foreground italic">
                        Learn from industry leaders who are passionate about sharing their knowledge and helping you succeed.
                    </p>
                    <div className="mt-6 flex justify-center gap-4">
                        <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2">
                            <Users size={16} /> {teachers.length}+ Experts
                        </span>
                        <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2">
                            <Award size={16} /> Certified
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {teachers.map((teacher: any) => (
                        <Card key={teacher._id} className="group flex flex-col bg-background overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <CardHeader className="p-0 relative h-64 overflow-hidden">
                                <Image
                                    src={teacher.avatar || "/placeholder-avatar.jpg"}
                                    alt={teacher.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"/>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <p className="text-white text-sm font-medium">{teacher.designation}</p>
                                </div>
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                    <span className="text-sm font-bold text-gray-800">{teacher.rating || "4.9"}</span>
                                </div>
                            </CardHeader>

                            <CardContent className="flex-grow p-6 text-center">
                                <div className="mb-2">
                                    <p className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">{teacher.course || "Multiple Courses"}</p>
                                    <CardTitle className="font-headline text-2xl font-bold text-gray-900 group-hover:text-[#2C4276] transition-colors line-clamp-1">
                                        {teacher.name}
                                    </CardTitle>
                                </div>

                                <div className="flex items-center justify-center gap-4 py-4 border-y border-gray-100 my-4">
                                    <div className="text-center px-4">
                                        <p className="text-gray-400 text-xs flex items-center justify-center gap-1 mb-1">
                                            <Briefcase size={12} /> Exp.
                                        </p>
                                        <p className="text-sm font-bold text-gray-800">{teacher.experience || "5+"} Yrs</p>
                                    </div>
                                    <div className="w-[1px] h-8 bg-gray-100"></div>
                                    <div className="text-center px-4">
                                        <p className="text-gray-400 text-xs flex items-center justify-center gap-1 mb-1">
                                            <GraduationCap size={12} /> Students
                                        </p>
                                        <p className="text-sm font-bold text-gray-800">{teacher.totalStudents || "100"}+</p>
                                    </div>
                                </div>

                                <p className="text-muted-foreground text-sm line-clamp-2 italic">
                                    Expert in {teacher.assignedCourses?.join(', ') || teacher.course}. Committed to excellence in teaching.
                                </p>
                            </CardContent>

                            <CardFooter className="p-6 pt-0">
                                <Button asChild className="w-full bg-[#2C4276] hover:bg-opacity-90 text-white font-bold h-12 rounded-xl group/btn transition-all">
                                    <Link href={`/teachers/${teacher._id}`} className="flex items-center justify-center gap-2">
                                        View Profile <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}

                    {teachers.length === 0 && (
                        <div className="col-span-full text-center py-24 bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-200">
                            <GraduationCap size={64} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-xl font-bold text-gray-900">No instructors found</h3>
                            <p className="text-gray-500 mt-2">We are currently onboarding new expert instructors. <br />Please check back soon!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
