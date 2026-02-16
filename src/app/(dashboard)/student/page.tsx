"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GraduationCap, TrendingUp, Award, User, CircleCheck, Calendar, Clock, Video, Mail, Phone, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

const LOGO_DARK_BLUE = "#1e3a8a"; 
const LOGO_LIGHT_BLUE = "#3b82f6"; 
const LOGO_AXT_BLUE = "#60a5fa"; 
const LOGO_ORANGE = "#f59e0b";

const performanceData = [
  { name: 'Mon', assignments: 2, videos: 3, tasks: 5 },
  { name: 'Tue', assignments: 1, videos: 5, tasks: 3 },
  { name: 'Wed', assignments: 3, videos: 2, tasks: 6 },
  { name: 'Thu', assignments: 1, videos: 4, tasks: 4 },
  { name: 'Fri', assignments: 4, videos: 6, tasks: 8 },
  { name: 'Sat', assignments: 2, videos: 3, tasks: 2 },
  { name: 'Sun', assignments: 0, videos: 8, tasks: 1 },
];

const activityData = [
  { name: 'Week 1', hours: 12 },
  { name: 'Week 2', hours: 18 },
  { name: 'Week 3', hours: 15 },
  { name: 'Week 4', hours: 25 },
];

const scoreData = [
  { name: 'Quizzes', value: 85, color: '#1e3a8a' },
  { name: 'Assignments', value: 78, color: '#3b82f6' },
  { name: 'Tests', value: 92, color: '#60a5fa' },
];

const upcomingClasses = [
  {
    id: 1,
    title: "Data Analyst",
    instructor: "Harshada Ahire",
    time: "04:30 PM - 06:00 PM",
    date: "Today",
    type: "Live session",
  },
  {
    id: 2,
    title: "Java Full Stack",
    instructor: "Jayshri Khirari",
    time: "10:00 AM - 11:30 AM",
    date: "Tomorrow",
    type: "Workshop",
  },
  {
    id: 3,
    title: "MERN Stack",
    instructor: "Juili Ware",
    time: "9:00 AM - 10:30 AM",
    date: "Tomorrow",
    type: "Workshop",
  }
];

export default function StudentPage() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(new Date().toLocaleDateString('en-US', options));
  }, []);

  return (
    <div className="p-3 sm:p-5 space-y-6 animate-fade-in bg-slate-50/50 min-h-screen">
      {/* Top Header with Live Date */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#1e3a8a] tracking-tight">Student Dashboard</h1>
          <p className="text-xs text-muted-foreground italic">"Boost your creativity"</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-slate-100">
          <Calendar className="h-3.5 w-3.5 text-blue-600" />
          <span className="text-xs font-semibold text-slate-700">{currentDate || "Loading date..."}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        <div className="lg:col-span-4 space-y-6">
          {/* Profile Card Section - Smaller version */}
          <Card className="overflow-hidden border-none shadow-md bg-white rounded-2xl group transition-all duration-500 hover:shadow-lg">
            <div className="h-[120px] bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            </div>

            <CardContent className="px-6 pb-6 text-center relative">
              <div className="relative -mt-20 mb-4 flex justify-center">
                <div className="relative h-[120px] w-[120px] group-hover:scale-105 transition-transform duration-500 ease-out">
                  <div className="absolute inset-0 bg-white rounded-full p-1 shadow-md ring-2 ring-blue-50">
                    <div className="h-full w-full rounded-full overflow-hidden bg-slate-50 border border-slate-100 relative">
                      <Image
                        src=""
                        alt="Student Profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-1 right-1 h-6 w-6 bg-green-500 border-2 border-white rounded-full shadow-sm" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
                    <User className="h-3 w-3 text-blue-700" />
                    <span className="text-[10px] font-bold text-blue-800 uppercase tracking-widest">Student Name</span>
                  </div>
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">ID: PAARSH-001</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:border-blue-200">
                    <p className="text-lg font-bold text-[#1e3a8a]">03</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Courses</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:border-blue-200">
                    <p className="text-lg font-bold text-[#1e3a8a]">08</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Certificates</p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-50/50 border border-green-100 transition-all hover:bg-white hover:border-green-200">
                    <p className="text-[10px] font-bold text-green-700 uppercase mb-1">Paid</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Fees Status</p>
                  </div>
                  <div className="p-3 rounded-xl bg-orange-50/50 border border-orange-100 transition-all hover:bg-white hover:border-orange-200">
                    <p className="text-lg font-bold text-orange-700">02</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Pending Asgn.</p>
                  </div>
                </div>

                <div className="pt-2 space-y-2 text-left">
                  <div className="flex items-center gap-2 text-[10px] text-slate-600">
                    <Mail className="h-3 w-3 text-blue-500" />
                    <span>student.name@example.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-600">
                    <Phone className="h-3 w-3 text-blue-500" />
                    <span>+91 98765 43210</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Course Progress</span>
                    <span className="text-[9px] font-bold text-blue-600">75%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full w-[75%]" />
                  </div>
                  <p className="text-[8px] text-slate-400 mt-1 italic text-left">Next session: Java Full Stack (Tomorrow)</p>
                </div>

                <div className="flex flex-wrap gap-1 pt-2">
                  <span className="px-2 py-0.5 bg-blue-50 text-[8px] font-bold text-blue-700 rounded-md border border-blue-100">React</span>
                  <span className="px-2 py-0.5 bg-orange-50 text-[8px] font-bold text-orange-700 rounded-md border border-orange-100">Java</span>
                  <span className="px-2 py-0.5 bg-green-50 text-[8px] font-bold text-green-700 rounded-md border border-green-100">SQL</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Board Score Pie Chart - Moved from right, width reduced automatically by being here */}
          <Card className="border-none shadow-md bg-white rounded-2xl">
            <CardHeader className="px-5 pt-4 pb-0">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-[#1e3a8a]">
                <Award className="h-4 w-4 text-blue-600" />
                Test Board Score
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-5 flex flex-col items-center">
              <div className="h-[160px] w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={scoreData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {scoreData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: '10px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-2 w-full px-2">
                {scoreData.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{item.name}</span>
                    </div>
                    <span className="text-xs font-bold text-[#1e3a8a] ml-3">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Graphs - Compact */}
        <div className="lg:col-span-8 space-y-6">
          {/* Upcoming Classes Section - Moved from left to top of right column */}
          <Card className="border-none shadow-md bg-white rounded-2xl overflow-hidden h-[270px]">
            <CardHeader className="px-6 pt-5 pb-3">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-[#1e3a8a]">
                <Clock className="h-4 w-4 text-blue-600" />
                Upcoming Classes
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {upcomingClasses.map((cls) => (
                  <div key={cls.id} className="p-4 rounded-xl bg-slate-50/50 border border-slate-100 space-y-3 group hover:border-blue-200 transition-colors h-[200px] w-fit">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-md text-slate-900">{cls.title}</h4>
                        <p className="text-xs text-slate-500">{cls.instructor}</p>
                      </div>
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Video className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase">
                      <span className="text-blue-600 px-2 py-0.5 bg-blue-50 rounded-md mt-10">{cls.date}</span>
                      <span className="mt-10">{cls.time}</span>
                    </div>
                    <Button size="sm" className="w-full text-xs h-9 rounded-lg bg-blue-600 hover:bg-[#1e3a8a] text-white transition-all">
                      Join Live Session
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Graph */}
          <Card className="border-none shadow-md bg-white rounded-2xl h-[280px]">
            <CardHeader className="px-6 pt-5 pb-0">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-[#1e3a8a]">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                Study Activity (Hours)
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-6">
              <div className="h-[200px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData}>
                    <defs>
                      <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={5} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: '10px' }}
                    />
                    <Area type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorHours)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>


          {/* Task Completion Graph - Moved from right */}
          <Card className="border-none shadow-md bg-white rounded-2xl h-[300px]" >
            <CardHeader className="px-5 pt-5 pb-0">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-bold flex items-center gap-2 text-[#1e3a8a]">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  Task Completion Breakup
                </CardTitle>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="flex items-center gap-1"><div className="h-1.5 w-1.5 rounded-full bg-[#1e3a8a]" /><span className="text-[10px] font-bold text-slate-400 uppercase">Tasks</span></div>
                <div className="flex items-center gap-1"><div className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]" /><span className="text-[10px] font-bold text-slate-400 uppercase">Videos</span></div>
                <div className="flex items-center gap-1"><div className="h-1.5 w-1.5 rounded-full bg-[#60a5fa]" /><span className="text-[10px] font-bold text-slate-400 uppercase">Assignments</span></div>
              </div>
            </CardHeader>
            <CardContent className="px-2 pb-5">
              <div className="h-[210px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={5} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <Tooltip
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: '10px' }}
                    />
                    <Bar dataKey="tasks" fill="#1e3a8a" radius={[3, 3, 0, 0]} barSize={12} />
                    <Bar dataKey="videos" fill="#3b82f6" radius={[3, 3, 0, 0]} barSize={12} />
                    <Bar dataKey="assignments" fill="#60a5fa" radius={[3, 3, 0, 0]} barSize={12} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
