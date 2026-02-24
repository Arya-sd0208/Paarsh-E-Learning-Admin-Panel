import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Mail, Phone, BookOpen, GraduationCap, Star, Award, Calendar, ArrowLeft, CheckCircle2, Briefcase, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { connectDB } from "@/lib/db";
import Teacher from "@/models/Teachers";

async function getTeacher(id: string) {
    try {
        await connectDB();
        const teacher = await Teacher.findById(id);
        if (!teacher) return null;
        return JSON.parse(JSON.stringify(teacher));
    } catch (error) {
        return null;
    }
}

export default async function TeacherDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const teacher = await getTeacher(id);

    if (!teacher) {
        notFound();
    }

    return (
        <div className="bg-secondary/20 min-h-screen">
            <div className="container mx-auto px-4 py-12 md:py-20">
                <div className="max-w-5xl mx-auto">
                    <Button variant="ghost" asChild className="mb-8 hover:bg-white/50 group">
                        <Link href="/teachers" className="flex items-center gap-2 text-gray-600">
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Back to Instructors
                        </Link>
                    </Button>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Sidebar Profile Card */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-background rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                                <div className="relative h-80 w-full">
                                    <Image
                                        src={teacher.avatar || "/placeholder-avatar.jpg"}
                                        alt={teacher.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-4 left-4 bg-[#2C4276] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                        {teacher.designation}
                                    </div>
                                </div>
                                <div className="p-8 text-center">
                                    <h1 className="text-2xl font-bold font-headline text-gray-900 mb-1">{teacher.name}</h1>
                                    <p className="text-[#2C4276] font-semibold text-sm mb-6">{teacher.course}</p>

                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="bg-gray-50 p-4 rounded-2xl">
                                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mx-auto mb-1" />
                                            <p className="text-xl font-bold">{teacher.rating || "4.9"}</p>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Rating</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-2xl">
                                            <Users className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                                            <p className="text-xl font-bold">{teacher.totalStudents || "100"}+</p>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Students</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Button className="w-full bg-[#2C4276] hover:bg-opacity-90 h-12 rounded-xl font-bold">
                                            Contact Instructor
                                        </Button>
                                        <p className="text-xs text-gray-400">Response time: Usually within 24 hours</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-50 space-y-4">
                                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                    <Award className="text-[#2C4276] w-5 h-5" /> Quick Info
                                </h3>
                                <div className="space-y-4 pt-2">
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#2C4276]">
                                            <Briefcase size={16} />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-[10px] font-bold uppercase">Experience</p>
                                            <p className="font-semibold text-gray-800">{teacher.experience} Years</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                            <Calendar size={16} />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-[10px] font-bold uppercase">Member Since</p>
                                            <p className="font-semibold text-gray-800">{teacher.dateOfJoining}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                                            <BookOpen size={16} />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-[10px] font-bold uppercase">Main Course</p>
                                            <p className="font-semibold text-gray-800">{teacher.course}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Areas */}
                        <div className="lg:col-span-2 space-y-8">
                            <article className="bg-background rounded-3xl shadow-xl overflow-hidden p-8 md:p-12 border border-blue-50">
                                <div className="flex items-center gap-2 mb-4">
                                    <GraduationCap className="text-[#2C4276] w-6 h-6" />
                                    <span className="text-sm font-bold text-[#2C4276] uppercase tracking-[3px]">About the Instructor</span>
                                </div>
                                <h2 className="text-3xl font-headline font-bold text-gray-900 mb-6">Empowering the next generation of {teacher.course} experts</h2>

                                <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
                                    <p className="text-lg leading-relaxed">
                                        With over <span className="font-bold text-[#2C4276]">{teacher.experience} years</span> of professional experience, {teacher.name} is a dedicated educator specialized in {teacher.course}.
                                        Throughout their career, they have mentored more than {teacher.totalStudents} students, helping them transition into successful careers in the industry.
                                    </p>

                                    <p>
                                        Currently serving as a <span className="font-medium">{teacher.designation}</span>, {teacher.name} brings real-world insights and practical industry standards into the classroom, ensuring that students aren't just learning theory, but are becoming job-ready.
                                    </p>

                                    <div className="bg-[#2C4276]/5 p-8 rounded-2xl border-l-4 border-[#2C4276] italic relative">
                                        <p className="text-lg text-gray-700 font-medium">
                                            "My teaching philosophy is built on the belief that everyone has the potential to master complex skills if given the right guidance and a hands-on approach."
                                        </p>
                                        <span className="block mt-4 text-[#2C4276] font-bold not-italic">— {teacher.name}</span>
                                    </div>

                                    <div className="mt-10">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <BookOpen className="w-5 h-5 text-[#2C4276]" /> Courses Taught
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {teacher.assignedCourses && teacher.assignedCourses.length > 0 ? (
                                                teacher.assignedCourses.map((course: string, index: number) => (
                                                    <div key={index} className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-[#2C4276]/30 hover:bg-blue-50/30 transition-all">
                                                        <CheckCircle2 className="text-green-500 w-5 h-5 flex-shrink-0" />
                                                        <span className="font-medium text-gray-800">{course}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 italic text-gray-500">
                                                    <CheckCircle2 className="text-gray-300 w-5 h-5" />
                                                    {teacher.course}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </article>

                            {/* Stats Section */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-50 text-center">
                                    <p className="text-3xl font-bold text-[#2C4276] mb-1">{teacher.totalStudents}+</p>
                                    <p className="text-xs font-bold text-gray-400 uppercase">Impacted Students</p>
                                </div>
                                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-50 text-center">
                                    <p className="text-3xl font-bold text-[#2C4276] mb-1">{teacher.rating || "4.9"}/5.0</p>
                                    <p className="text-xs font-bold text-gray-400 uppercase">Student Rating</p>
                                </div>
                                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-50 text-center">
                                    <p className="text-3xl font-bold text-[#2C4276] mb-1">{teacher.experience}+</p>
                                    <p className="text-xs font-bold text-gray-400 uppercase">Years Experience</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
