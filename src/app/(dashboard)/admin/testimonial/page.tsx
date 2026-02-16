"use client";

import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Plus,
    Pencil,
    Trash2,
    Star,
    Search,
    Filter,
    MessageSquare,
    Check,
    X as CloseIcon,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Testimonial {
    _id: string;
    name: string;
    course: string;
    message: string;
    rating: number;
    status: "pending" | "approved" | "rejected";
}

export default function AdmintestimonialPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [form, setForm] = useState({
        _id: "",
        name: "",
        course: "",
        message: "",
        rating: 5,
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const testimonialsPerPage = 10;
    const fetchTestimonials = async (page = 1) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/testimonial?status=all&page=${page}&limit=${testimonialsPerPage}`);
            const result = await res.json();
            setTestimonials(result.data || []);
            if (result.pagination) {
                setTotal(result.pagination.total);
                setTotalPages(result.pagination.totalPages);
                setCurrentPage(result.pagination.page);
            }
        } catch (error) {
            console.error("Error fetching testimonials:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials(currentPage);
    }, [currentPage]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.message) {
            alert("Please fill in name and message");
            return;
        }

        try {
            const method = form._id ? "PUT" : "POST";
            const url = form._id ? `/api/testimonial/${form._id}` : "/api/testimonial";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    course: form.course,
                    message: form.message,
                    rating: form.rating,
                }),
            });

            if (res.ok) {
                fetchTestimonials();
                setForm({
                    _id: "",
                    name: "",
                    course: "",
                    message: "",
                    rating: 5,
                });
                setIsDialogOpen(false);
            } else {
                const errorData = await res.json();
                alert("Error: " + errorData.error);
            }
        } catch (error) {
            console.error("Error saving testimonial:", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;
        try {
            const res = await fetch(`/api/testimonial/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                fetchTestimonials();
            }
        } catch (error) {
            console.error("Error deleting testimonial:", error);
        }
    };

    const handleEdit = (t: Testimonial) => {
        setForm({
            _id: t._id,
            name: t.name,
            course: t.course,
            message: t.message,
            rating: t.rating,
        });
        setIsDialogOpen(true);
    };

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/testimonial/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) fetchTestimonials();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const openAddDialog = () => {
        setForm({
            _id: "",
            name: "",
            course: "",
            message: "",
            rating: 5,
        });
        setIsDialogOpen(true);
    };

    return (
        <div className="p-4 md:p-10 bg-gray-50/50 min-h-[calc(100vh-64px)]">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Testimonials</h1>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openAddDialog} className="w-full md:w-auto bg-[#2B4278] hover:bg-[#1a2a4d] shadow-md">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Testimonial
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px] rounded-3xl">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-[#2B4278]">
                                    {form._id ? "Update" : "Add New"} Testimonial
                                </DialogTitle>
                            </DialogHeader>

                            <form onSubmit={handleSubmit} className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">Student Name</label>
                                    <Input
                                        required
                                        placeholder="Enter name"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="rounded-xl border-gray-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">Course / Role</label>
                                    <Input
                                        required
                                        placeholder="e.g. MERN Stack Dev"
                                        value={form.course}
                                        onChange={(e) => setForm({ ...form, course: e.target.value })}
                                        className="rounded-xl border-gray-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">Rating</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <button
                                                key={s}
                                                type="button"
                                                onClick={() => setForm({ ...form, rating: s })}
                                                className="focus:outline-none"
                                            >
                                                <Star className={`h-6 w-6 ${s <= form.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">Feedback Message</label>
                                    <Textarea
                                        required
                                        placeholder="Write the testimonial message here..."
                                        className="rounded-xl border-gray-200 min-h-[100px]"
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    />
                                </div>

                                <Button type="submit" className="w-full bg-[#01A0E2] hover:bg-[#0089c2] rounded-xl h-12 text-lg">
                                    {form._id ? "Update" : "Submit"} Testimonial
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Filters/Search Bar */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row gap-4 items-center">
                    <div className="relative w-full sm:flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input placeholder="Search by name or course..." className="pl-10 rounded-xl border-gray-100 bg-gray-50/50 w-full" />
                    </div>
                    <Button variant="outline" className="w-full sm:w-auto rounded-xl border-gray-100 text-gray-600">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                    </Button>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-xl md:rounded-3xl shadow-sm border border-gray-100 overflow-hidden text-black">
                    <Table>
                        <TableHeader className="bg-gray-50/50">
                            <TableRow>
                                <TableHead className="w-[150px] md:w-[200px] font-semibold">Student Name</TableHead>
                                <TableHead className="w-[180px] hidden md:table-cell font-semibold">Course</TableHead>
                                <TableHead className="font-semibold">Message</TableHead>
                                <TableHead className="w-[100px] hidden sm:table-cell font-semibold">Rating</TableHead>
                                <TableHead className="w-[100px] sm:w-[120px] font-semibold">Status</TableHead>
                                <TableHead className="w-[100px] md:w-[150px] text-right font-semibold pr-4">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#01A0E2] border-t-transparent" />
                                            <p className="text-gray-500 font-medium">Loading testimonials...</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : testimonials.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-20">
                                        <div className="max-w-xs mx-auto flex flex-col items-center gap-3">
                                            <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center">
                                                <MessageSquare className="h-8 w-8 text-gray-200" />
                                            </div>
                                            <p className="text-gray-500 font-medium">No testimonials found.</p>
                                            <Button onClick={openAddDialog} variant="outline" className="rounded-xl hover:bg-[#2B4278] hover:text-white">Add your first one</Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                testimonials.map((t) => (
                                    <TableRow key={t._id} className="hover:bg-gray-50/50 transition-colors">
                                        <TableCell className="font-medium text-xs md:text-sm">{t.name}</TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-[10px] md:text-xs font-semibold whitespace-nowrap">
                                                {t.course}
                                            </span>
                                        </TableCell>
                                        <TableCell className="max-w-[120px] sm:max-w-xs md:max-w-md truncate text-gray-600 text-[11px] md:text-sm">
                                            "{t.message}"
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell text-center">
                                            <div className="flex gap-0.5 justify-center">
                                                {[...Array(t.rating)].map((_, i) => (
                                                    <Star key={i} className="h-3 w-3 md:h-3.5 md:w-3.5 text-yellow-500 fill-yellow-500" />
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${t.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                t.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {t.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right pr-4">
                                            <div className="flex justify-end gap-1 md:gap-1.5 grayscale-[0.3] hover:grayscale-0">
                                                {t.status !== 'approved' && (
                                                    <Button
                                                        onClick={() => handleStatusUpdate(t._id, 'approved')}
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 md:h-8 md:w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                                                        title="Approve"
                                                    >
                                                        <Check className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                                    </Button>
                                                )}
                                                {t.status !== 'rejected' && (
                                                    <Button
                                                        onClick={() => handleStatusUpdate(t._id, 'rejected')}
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 md:h-8 md:w-8 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                                                        title="Reject"
                                                    >
                                                        <CloseIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                                    </Button>
                                                )}
                                                <Button
                                                    onClick={() => handleEdit(t)}
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 md:h-8 md:w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                    title="Edit"
                                                >
                                                    <Pencil className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                                </Button>
                                                <Button
                                                    onClick={() => handleDelete(t._id)}
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 md:h-8 md:w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="px-4 md:px-6 py-4 border-t bg-gray-50 flex flex-col lg:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-600 text-center lg:text-left">
                        Showing <span className="font-medium">{(currentPage - 1) * testimonialsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * testimonialsPerPage, total)}</span> of <span className="font-medium">{total}</span> testimonials
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="px-3 md:px-4 py-2 text-xs md:text-sm rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
                        >
                            Previous
                        </button>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) pageNum = i + 1;
                                else if (currentPage <= 3) pageNum = i + 1;
                                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                                else pageNum = currentPage - 2 + i;

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`w-8 h-8 md:w-10 md:h-10 rounded-lg text-xs md:text-sm transition-colors ${currentPage === pageNum ? "bg-[#2C4276] text-white" : "border bg-white hover:bg-gray-50 text-gray-700"
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 md:px-4 py-2 text-xs md:text-sm rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
