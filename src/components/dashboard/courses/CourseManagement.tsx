"use client";

import { useState } from "react";
import { useGetCoursesQuery } from "@/redux/api/courseApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import CourseFormModal from "@/components/dashboard/courses/CourseFormModal";
import { Eye, Pencil, Trash2 } from "lucide-react";
import CourseViewModal from "@/components/dashboard/courses/CourseViewModal";
import { useDeleteCourseMutation } from "@/redux/api/courseApi";
import { toast } from "sonner";

export default function CourseManagement() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [open, setOpen] = useState(false);
const [editing, setEditing] = useState(null);

const handleClose = () => {
  setEditing(null);
  setOpen(false);
};

  const { data, isLoading } = useGetCoursesQuery({
    page,
    limit: 10,
    search,
    category,
    sort,
  });

  const courses = Array.isArray(data?.courses) ? data.courses : [];
const totalPages = data?.totalPages || 1;

const [viewOpen, setViewOpen] = useState(false);
const [viewCourse, setViewCourse] = useState<any>(null);
const [deleteCourse] = useDeleteCourseMutation();

const handleDelete = async (id: string) => {
  const confirmDelete = confirm(
    "Are you sure you want to delete this course?"
  );

  if (!confirmDelete) return;

  try {
    await deleteCourse(id).unwrap();
    toast.success("Course deleted successfully");
  } catch (error) {
    toast.error("Failed to delete course");
  }
};


  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Courses Management
          </h1>
          <p className="text-gray-500 text-sm">
            Manage and track all available courses
          </p>
        </div>

        <Button
  onClick={() => {
    setEditing(null);   // ensure it's create mode
    setOpen(true);
  }}
  className="bg-blue-900 hover:bg-blue-950 text-white"
>
  + Add Course
</Button>
      </div>

      {/* FILTERS */}
      <div className="flex gap-4 items-center">

        {/* Search */}
        <Input
          placeholder="Search courses..."
          className="w-64"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        {/* Category Filter */}
   <Select
  value={category}
  onValueChange={(val) => {
    setPage(1);
    setCategory(val === "all" ? "" : val);
  }}
>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>            
            <SelectItem value="web">Web</SelectItem>
            <SelectItem value="data">Data</SelectItem>
            <SelectItem value="ai">AI</SelectItem>
          </SelectContent>
        </Select>

        {/* Sorting */}
        <Select
          value={sort}
          onValueChange={(val) => setSort(val)}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price_asc">Price: Low → High</SelectItem>
            <SelectItem value="price_desc">Price: High → Low</SelectItem>
            <SelectItem value="date_desc">Newest First</SelectItem>
            <SelectItem value="date_asc">Oldest First</SelectItem>
          </SelectContent>
        </Select>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
             <th className="p-4 text-left">ID</th>
  <th className="p-4 text-left">Course</th>
  <th className="p-4 text-left">Category</th>
  <th className="p-4 text-left">Instructor</th>
  <th className="p-4 text-left">Duration</th>
  <th className="p-4 text-left">Price</th>
  <th className="p-4 text-left">Status</th>
  <th className="p-4 text-left">Created</th>
  <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {isLoading ? (
              <tr>
                <td colSpan={9} className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              courses.map((course: any, index: number) => (
                <tr
                  key={course._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4">{(page - 1) * 10 + index + 1}</td>

                  <td className="p-4 flex items-center gap-3">
                    {course.thumbnail ? (
    <img
      src={course.thumbnail}
      alt={course.name}
      className="w-10 h-10 rounded-md object-cover"
    />
  ) : (
    <div className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center text-xs text-gray-500">
      N/A
    </div>
  )}
                    <div>
                      <p className="font-medium text-gray-800">
                        {course.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate w-48">
                        {course.shortDescription}
                      </p>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs">
                      {course.category?.name}
                    </span>
                  </td>

                  <td className="p-4">
                    {course.instructor?.name}
                  </td>

                  <td className="p-4">
                    {course.duration} Days
                  </td>

                  <td className="p-4 font-semibold">
                    ₹ {course.fee}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-md text-xs ${
                        course.status === "active"
                          ? "bg-green-100 text-green-700"
                          : course.status === "inactive"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>

                  <td className="p-4 text-gray-500">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
<td className="p-4">
  <div className="flex items-center gap-3">

    {/* View */}
    <button 
    onClick={() => {
    setViewCourse(course);
    setViewOpen(true);
  }}
    type="button"
    className="text-green-600 hover:text-green-800 transition"
  >
    <Eye size={18} />
  </button>

    {/* Edit */}
    <button
      onClick={() => {
        setEditing(course);
        setOpen(true);
      }}
      className="text-blue-600 hover:bg-blue-50 p-1 rounded transition"
    >
     <Pencil size={18} />
    </button>

    {/* Delete */}
    <button
      className="text-red-600 hover:bg-red-50 p-1 rounded transition" 
        onClick={() => handleDelete(course._id)}
   >
     <Trash2 size={18} />
    </button>

  </div>
</td>
                </tr>
              ))
            )}

          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {/* PAGINATION */}
<div className="flex justify-between items-center bg-white px-6 py-4 border rounded-xl shadow-sm">

  {/* Left Side Info */}
  <p className="text-sm text-gray-600">
    Showing {(page - 1) * 10 + 1} to{" "}
   {Math.min(page * 10, data?.total || page * 10)} of{" "}
{data?.total || 0}
  </p>

  {/* Right Side Controls */}
  <div className="flex items-center gap-2">

    {/* Previous */}
    <button
      disabled={page === 1}
      onClick={() => setPage((prev) => prev - 1)}
      className={`px-4 py-2 rounded-lg text-sm border transition ${
        page === 1
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-gray-100"
      }`}
    >
      Previous
    </button>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
      <button
        key={p}
        onClick={() => setPage(p)}
        className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
          page === p
            ? "bg-blue-900 text-white shadow-md"
            : "bg-white border hover:bg-gray-100"
        }`}
      >
        {p}
      </button>
    ))}

    {/* Next */}
    <button
      disabled={page === totalPages}
      onClick={() => setPage((prev) => prev + 1)}
      className={`px-4 py-2 rounded-lg text-sm border transition ${
        page === totalPages
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-gray-100"
      }`}
    >
      Next
    </button>

  </div>
</div>
 <CourseFormModal
  open={open}
  setOpen={setOpen}
  editing={editing}
  onClose={handleClose}
/>

<CourseViewModal
  open={viewOpen}
  setOpen={setViewOpen}
  course={viewCourse}
/>
    </div>
  );
}