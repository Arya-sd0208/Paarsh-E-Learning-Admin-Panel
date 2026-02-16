"use client";

import { useState, useEffect } from "react";
import { Eye, Pencil, Trash2, Plus, Search, Loader2, X } from "lucide-react";

interface Blog {
    _id: string;
    title: string;
    content: string;
    author: {
        name: string;
        role: string;
        avatar: string;
    };
    publishedDate: string;
    tags: string[];
    status: "published" | "draft";
}

interface BlogFormData {
    title: string;
    content: string;
    author: {
        name: string;
        role: string;
    };
    tags: string;
    status: "published" | "draft";
}

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const blogsPerPage = 10;

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
    const [formLoading, setFormLoading] = useState(false);

    const [formData, setFormData] = useState<BlogFormData>({
        title: "",
        content: "",
        author: {
            name: "",
            role: "",
        },
        tags: "",
        status: "draft",
    });

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `/api/blogs?search=${searchQuery}&page=${currentPage}&limit=${blogsPerPage}`
            );
            const data = await response.json();

            if (response.ok) {
                setBlogs(data.blogs);
                setTotalPages(data.pagination.totalPages);
                setTotal(data.pagination.total);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            fetchBlogs();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchQuery, currentPage]);

    const handleAddBlog = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormLoading(true);

        try {
            const response = await fetch("/api/blogs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    tags: formData.tags.split(",").map((tag) => tag.trim()),
                }),
            });

            if (response.ok) {
                setIsAddModalOpen(false);
                resetForm();
                fetchBlogs();
            } else {
                alert("Failed to create blog");
            }
        } catch (error) {
            console.error("Error creating blog:", error);
            alert("Failed to create blog");
        } finally {
            setFormLoading(false);
        }
    };

    const handleEditBlog = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedBlog) return;

        setFormLoading(true);

        try {
            const response = await fetch(`/api/blogs/${selectedBlog._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    tags: formData.tags.split(",").map((tag) => tag.trim()),
                }),
            });

            if (response.ok) {
                setIsEditModalOpen(false);
                resetForm();
                fetchBlogs();
            } else {
                alert("Failed to update blog");
            }
        } catch (error) {
            console.error("Error updating blog:", error);
            alert("Failed to update blog");
        } finally {
            setFormLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this blog?")) {
            try {
                const response = await fetch(`/api/blogs/${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    fetchBlogs();
                } else {
                    alert("Failed to delete blog");
                }
            } catch (error) {
                console.error("Error deleting blog:", error);
                alert("Failed to delete blog");
            }
        }
    };

    const openAddModal = () => {
        resetForm();
        setIsAddModalOpen(true);
    };

    const openEditModal = (blog: Blog) => {
        setSelectedBlog(blog);
        setFormData({
            title: blog.title,
            content: blog.content,
            author: {
                name: blog.author.name,
                role: blog.author.role,
            },
            tags: blog.tags.join(", "),
            status: blog.status,
        });
        setIsEditModalOpen(true);
    };

    const openViewModal = (blog: Blog) => {
        setSelectedBlog(blog);
        setIsViewModalOpen(true);
    };

    const resetForm = () => {
        setFormData({
            title: "",
            content: "",
            author: { name: "", role: "" },
            tags: "",
            status: "draft",
        });
        setSelectedBlog(null);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        });
    };

    return (
        <div className="p-6 bg-gray-50">
            <div className=" p-6 mb-2">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-[#2C4276]">Blog Management</h1>
                    <div className="flex gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search blogs..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="pl-10 pr-4 py-2 rounded-lg border-0 focus:ring-2 focus:ring-white w-64 shadow-md"
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                        </div>
                        <button
                            onClick={openAddModal}
                            className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-normal shadow-md"
                        >
                            <Plus size={20} />
                            Add New Blog
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="animate-spin text-blue-600" size={40} />
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No blogs found</p>
                        <p className="text-gray-400 text-sm mt-2">
                            {searchQuery
                                ? "Try adjusting your search"
                                : "Click 'Add New Blog' to create your first blog"}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="custom-scrollbar-container overflow-y-auto overflow-x-hidden sm:overflow-x-scroll h-[400px] sm:max-h-[600px] border rounded-lg pb-4 sm:pb-0 sm:overflow-x-hidden">
                            <table className="w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 border-b sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Author
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Published Date
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Tags
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {blogs.map((blog, index) => (
                                        <tr
                                            key={blog._id}
                                            className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                                {(currentPage - 1) * blogsPerPage + index + 1}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium max-w-xs truncate">
                                                {blog.title}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                                                        {blog.author.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {blog.author.name}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {blog.author.role}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {formatDate(blog.publishedDate)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1 max-w-md">
                                                    {blog.tags.slice(0, 3).map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    {blog.tags.length > 3 && (
                                                        <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                                                            +{blog.tags.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${blog.status === "published"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                        }`}>
                                                    {blog.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => openViewModal(blog)}
                                                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                        title="View">
                                                        <Eye size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => openEditModal(blog)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit">
                                                        <Pencil size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(blog._id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="px-6 py-4 border-t bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-sm text-gray-600">
                                Showing <span className="font-medium">{(currentPage - 1) * blogsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * blogsPerPage, total)}</span> of <span className="font-medium">{total}</span> blogs
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 text-sm rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors">
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
                                                className={`w-10 h-10 rounded-lg text-sm transition-colors ${currentPage === pageNum ? "bg-[#2C4276] text-white" : "border bg-white hover:bg-gray-50 text-gray-700"
                                                    }`}>
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                </div>
                                <button
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 text-sm rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors">
                                    Next
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
                            <h2 className="text-2xl font-bold text-[#2C4276]">Add New Blog</h2>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleAddBlog} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter blog title" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Content *
                                </label>
                                <textarea
                                    required
                                    value={formData.content}
                                    onChange={(e) =>
                                        setFormData({ ...formData, content: e.target.value })
                                    }
                                    rows={6}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Write your blog content here..." />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Author Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.author.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                author: { ...formData.author, name: e.target.value },
                                            })
                                        }
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="full name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Author Role *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.author.role}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                author: { ...formData.author, role: e.target.value },
                                            })
                                        }
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Software Developer" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tags (comma-separated)
                                </label>
                                <input
                                    type="text"
                                    value={formData.tags}
                                    onChange={(e) =>
                                        setFormData({ ...formData, tags: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="React, JavaScript, WebDev" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status *
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            status: e.target.value as "published" | "draft",
                                        })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={formLoading}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2">
                                    {formLoading && <Loader2 className="animate-spin" size={16} />}
                                    Create Blog
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
                            <h2 className="text-2xl font-bold text-gray-900">Edit Blog</h2>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleEditBlog} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Content *
                                </label>
                                <textarea
                                    required
                                    value={formData.content}
                                    onChange={(e) =>
                                        setFormData({ ...formData, content: e.target.value })
                                    }
                                    rows={6}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Author Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.author.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                author: { ...formData.author, name: e.target.value },
                                            })
                                        }
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Author Role *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.author.role}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                author: { ...formData.author, role: e.target.value },
                                            })
                                        }
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tags (comma-separated)
                                </label>
                                <input
                                    type="text"
                                    value={formData.tags}
                                    onChange={(e) =>
                                        setFormData({ ...formData, tags: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status *
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            status: e.target.value as "published" | "draft",
                                        })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={formLoading}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2">
                                    {formLoading && <Loader2 className="animate-spin" size={16} />}
                                    Update Blog
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isViewModalOpen && selectedBlog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
                            <h2 className="text-2xl font-bold text-gray-900">View Blog</h2>
                            <button
                                onClick={() => setIsViewModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                                    {selectedBlog.title}
                                </h3>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                                            {selectedBlog.author.name.charAt(0)}
                                        </div>
                                        <span className="font-medium">{selectedBlog.author.name}</span>
                                    </div>
                                    <span>•</span>
                                    <span>{selectedBlog.author.role}</span>
                                    <span>•</span>
                                    <span>{formatDate(selectedBlog.publishedDate)}</span>
                                    <span>•</span>
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-semibold ${selectedBlog.status === "published"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                            }`}>
                                        {selectedBlog.status}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {selectedBlog.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="prose max-w-none">
                                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                                    {selectedBlog.content}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button
                                    onClick={() => {
                                        setIsViewModalOpen(false);
                                        openEditModal(selectedBlog);
                                    }}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    Edit Blog
                                </button>
                                <button
                                    onClick={() => setIsViewModalOpen(false)}
                                    className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
