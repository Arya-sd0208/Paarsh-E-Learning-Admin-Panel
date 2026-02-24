"use client";

import { useState, useMemo } from "react";
import { Eye, Download, Search, Loader2, X, Filter, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useFetchEntranceCollegesQuery, useGetEntranceTestSessionsQuery } from "@/redux/api";

interface TestSession {
    _id: string;
    student: { _id: string; name: string } | null;
    college: { _id: string; name: string } | null;
    testId: string;
    startTime: string;
    endTime?: string;
    duration: number;
    score: number;
    percentage: number;
    status: "pending" | "active" | "completed";
    isPassed: boolean;
    batchName?: string;
}

const EntranceLogsPage = () => {
    const [selectedCollegeFilter, setSelectedCollegeFilter] = useState<string>("all");
    const [page, setPage] = useState(1);
    const [limit] = useState(20);
    const [selectedSession, setSelectedSession] = useState<TestSession | null>(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);

    const [filters, setFilters] = useState({
        studentName: "",
        testId: "",
        passStatus: "all",
        date: "",
        batch: "all"
    });

    const queryParams = useMemo(() => ({
        page,
        limit,
        collegeId: selectedCollegeFilter !== "all" ? selectedCollegeFilter : undefined,
        studentName: filters.studentName || undefined,
        testId: filters.testId || undefined,
        passStatus: filters.passStatus !== "all" ? filters.passStatus : undefined,
        date: filters.date || undefined,
        batchName: filters.batch !== "all" ? filters.batch : undefined,
    }), [page, limit, selectedCollegeFilter, filters]);

    const { data: collegesData } = useFetchEntranceCollegesQuery(undefined);
    const { data: apiResponse, isLoading } = useGetEntranceTestSessionsQuery(queryParams);

    const colleges = collegesData?.colleges || [];
    const sessions = apiResponse?.testSessions || [];
    const pagination = apiResponse?.pagination || { totalPages: 0, hasMore: false, totalRecords: 0 };

    const formatDate = (date?: string) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleExport = () => {
        if (sessions.length === 0) return toast.error("No data to export");
        const headers = ["Student", "Exam ID", "College", "Score", "Percentage", "Passed", "Date"];
        const csvContent = [headers, ...sessions.map((s: TestSession) => [
            s.student?.name || "N/A",
            s.testId,
            s.college?.name || "N/A",
            s.score,
            `${s.percentage?.toFixed(1)}%`,
            s.isPassed ? "Yes" : "No",
            formatDate(s.startTime)
        ])].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `entrance-logs-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        toast.success("Logs exported to CSV");
    };

    const clearFilters = () => {
        setFilters({ studentName: "", testId: "", passStatus: "all", date: "", batch: "all" });
        setSelectedCollegeFilter("all");
        setPage(1);
    };

    return (
        <div className="bg-gray-50 h-full">
            <div className="mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-[#2C4276]">Entrance Test Logs</h1>
                        <p className="text-gray-500 text-sm mt-1">Review student performance and exam history</p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <button
                            onClick={handleExport}
                            className="bg-[#2C4276] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2 shadow-sm font-medium"
                        >
                            <Download size={18} />
                            Export CSV
                        </button>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border">
                <div className="flex items-center gap-2 mb-4 text-gray-700 font-semibold">
                    <Filter size={18} />
                    <span>Quick Filters</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Student name..."
                            value={filters.studentName}
                            onChange={e => { setFilters({ ...filters, studentName: e.target.value }); setPage(1); }}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-600 bg-gray-50/50"
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    </div>
                    <select
                        value={selectedCollegeFilter}
                        onChange={e => { setSelectedCollegeFilter(e.target.value); setPage(1); }}
                        className="h-10 border rounded-lg px-3 text-sm bg-gray-50/50 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="all">All Colleges</option>
                        {colleges.map((c: { _id: string; name: string }) => (
                            <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Exam ID..."
                        value={filters.testId}
                        onChange={e => { setFilters({ ...filters, testId: e.target.value }); setPage(1); }}
                        className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-600 bg-gray-50/50"
                    />
                    <select
                        value={filters.passStatus}
                        onChange={e => { setFilters({ ...filters, passStatus: e.target.value }); setPage(1); }}
                        className="h-10 border rounded-lg px-3 text-sm bg-gray-50/50 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="all">All Status</option>
                        <option value="pass">Pass</option>
                        <option value="fail">Fail</option>
                    </select>
                    <input
                        type="date"
                        className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-600 bg-gray-50/50"
                        value={filters.date}
                        onChange={e => { setFilters({ ...filters, date: e.target.value }); setPage(1); }}
                    />
                    <button
                        onClick={clearFilters}
                        className="px-4 py-2 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors font-semibold flex items-center gap-2 justify-center border border-dashed border-gray-300"
                    >
                        <RotateCcw size={14} /> Reset
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="animate-spin text-blue-600" size={40} />
                        <p className="text-gray-500 animate-pulse">Loading test logs...</p>
                    </div>
                ) : sessions.length === 0 ? (
                    <div className="text-center py-20 px-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="text-gray-400" size={32} />
                        </div>
                        <p className="text-gray-500 text-lg font-medium">No test logs found</p>
                        <p className="text-gray-400 text-sm mt-2 max-w-sm mx-auto">Try adjusting your filters or wait for students to take exams.</p>
                    </div>
                ) : (
                    <>
                        <div className="custom-scrollbar-container overflow-y-auto h-[450px] sm:max-h-[600px] border rounded-lg pb-4 sm:pb-0">
                            <table className="w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 border-b sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Student</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Exam ID</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">College</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Score</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Percentage</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Result</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {sessions.map((s: TestSession) => (
                                        <tr key={s._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2C4276] to-blue-500 flex items-center justify-center text-white font-bold shadow-inner uppercase">
                                                        {s.student?.name?.charAt(0) || "?"}
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-900">{s.student?.name || "N/A"}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">{s.testId}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-[200px] truncate" title={s.college?.name || "N/A"}>
                                                {s.college?.name || "N/A"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{s.score}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">{(s.percentage || 0).toFixed(1)}%</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${s.isPassed ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-700 border-red-100"}`}>
                                                    {s.isPassed ? "Pass" : "Fail"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(s.startTime)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => { setSelectedSession(s); setViewDialogOpen(true); }}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 border-t bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-sm text-gray-600">
                                Showing <span className="font-medium">{sessions.length}</span> of <span className="font-medium">{pagination.totalRecords}</span> records
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    disabled={page === 1}
                                    onClick={() => setPage(p => p - 1)}
                                    className="px-4 py-2 text-sm rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
                                >
                                    Previous
                                </button>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: Math.min(pagination.totalPages || 1, 5) }, (_, i) => {
                                        let pageNum;
                                        const tp = pagination.totalPages || 1;
                                        if (tp <= 5) pageNum = i + 1;
                                        else if (page <= 3) pageNum = i + 1;
                                        else if (page >= tp - 2) pageNum = tp - 4 + i;
                                        else pageNum = page - 2 + i;

                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => setPage(pageNum)}
                                                className={`w-10 h-10 rounded-lg text-sm transition-colors ${page === pageNum ? "bg-[#2C4276] text-white" : "border bg-white hover:bg-gray-50 text-gray-700"}`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                </div>
                                <button
                                    disabled={page === pagination.totalPages || pagination.totalRecords === 0}
                                    onClick={() => setPage(p => p + 1)}
                                    className="px-4 py-2 text-sm rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* View Detail Modal */}
            {viewDialogOpen && selectedSession && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                            <h2 className="text-xl font-bold text-[#2C4276]">Test Result Summary</h2>
                            <button onClick={() => setViewDialogOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={24} /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex flex-col items-center mb-6">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2C4276] to-blue-500 flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-xl border-4 border-white">
                                    {selectedSession.student?.name?.charAt(0) || "?"}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">{selectedSession.student?.name}</h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-100">{selectedSession.college?.name || "N/A"}</span>
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${selectedSession.isPassed ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-700 border-red-100"}`}>
                                        {selectedSession.isPassed ? "Pass" : "Fail"}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">Score</p>
                                        <p className="text-xl font-bold text-gray-900">{selectedSession.score}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">Percentage</p>
                                        <p className="text-xl font-bold text-gray-900">{selectedSession.percentage?.toFixed(1)}%</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500 font-medium">Exam ID</span>
                                        <span className="text-gray-900 font-mono font-bold bg-white px-2 py-1 rounded border overflow-hidden truncate max-w-[150px]">{selectedSession.testId}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500 font-medium">Total Duration</span>
                                        <span className="text-gray-900 font-bold">{selectedSession.duration} mins</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500 font-medium">Attempted On</span>
                                        <span className="text-gray-900 font-bold">{formatDate(selectedSession.startTime)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    onClick={() => setViewDialogOpen(false)}
                                    className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
                                >
                                    Dismiss Record
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EntranceLogsPage;
