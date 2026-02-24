"use client";

import { useState, useRef } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Upload,
    Search,
    Loader2,
    Trash2,
    Eye,
    Pencil,
    BookOpen,
    CheckCircle2,
    AlertCircle,
    Download,
    X
} from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { useBulkUploadEntranceQuestionsMutation } from "@/redux/api";

interface QuestionPreview {
    question: string;
    options: { text: string; isCorrect: boolean }[];
    correctAnswer: string;
    category: string;
    explanation?: string;
}

export default function EntranceBulkUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<QuestionPreview[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [bulkUpload] = useBulkUploadEntranceQuestionsMutation();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            const isExcel = selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            const isCSV = selectedFile.type === "text/csv";
            if (isExcel || isCSV) {
                setFile(selectedFile);
                parseFile(selectedFile);
            } else {
                toast.error("Invalid file format. Please upload XLSX or CSV.");
            }
        }
    };

    const parseFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target?.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet) as any[];

            const parsed = jsonData.map((row: any) => {
                const qText = row.Question?.toString() || row.question?.toString() || "";
                const correctAns = row.CorrectAnswer?.toString() || row.correctAnswer?.toString() || "";
                const opts = [
                    { text: (row.OptionA || row.option1)?.toString() || "", isCorrect: (row.OptionA || row.option1)?.toString() === correctAns },
                    { text: (row.OptionB || row.option2)?.toString() || "", isCorrect: (row.OptionB || row.option2)?.toString() === correctAns },
                    { text: (row.OptionC || row.option3)?.toString() || "", isCorrect: (row.OptionC || row.option3)?.toString() === correctAns },
                    { text: (row.OptionD || row.option4)?.toString() || "", isCorrect: (row.OptionD || row.option4)?.toString() === correctAns },
                ].filter(o => o.text);
                return {
                    question: qText,
                    options: opts,
                    correctAnswer: correctAns,
                    category: (row.Category || row.category)?.toString().toLowerCase() || "aptitude",
                    explanation: (row.Explanation || row.explanation)?.toString() || "",
                };
            }).filter(q => q.question && q.correctAnswer && q.options.length > 0);

            setPreview(parsed);
            if (parsed.length > 0) {
                toast.success(`${parsed.length} questions parsed successfully`);
            }
        };
        reader.readAsBinaryString(file);
    };

    const handleUpload = async () => {
        if (preview.length === 0) return;
        setIsUploading(true);
        try {
            await bulkUpload({ questions: preview }).unwrap();
            toast.success("Questions uploaded successfully");
            setFile(null);
            setPreview([]);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (err: any) {
            toast.error(err?.data?.message || "Upload failed");
        } finally {
            setIsUploading(false);
        }
    };

    const downloadTemplate = () => {
        const headers = ["Question", "OptionA", "OptionB", "OptionC", "OptionD", "CorrectAnswer", "Category", "Explanation"];
        const sampleData = [
            ["Find the average of 10, 20, 30, 40", "20", "25", "30", "35", "25", "aptitude", "Sum(10,20,30,40)/4 = 100/4 = 25"],
            ["What is 25% of 200?", "40", "50", "60", "75", "50", "quantitative", "0.25 * 200 = 50"]
        ];
        const ws = XLSX.utils.aoa_to_sheet([headers, ...sampleData]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Template");
        XLSX.writeFile(wb, "entrance_bulk_template.xlsx");
    };

    const filteredPreview = preview.filter(q => {
        const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === "all" || q.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "aptitude": return "bg-blue-100 text-blue-700";
            case "logical": return "bg-purple-100 text-purple-700";
            case "quantitative": return "bg-green-100 text-green-700";
            case "verbal": return "bg-yellow-100 text-yellow-700";
            case "technical": return "bg-orange-100 text-orange-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="bg-gray-50 h-full">
            <div className="mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h1 className="text-3xl font-bold text-[#2C4276]">Bulk Upload Questions</h1>
                    <div className="flex gap-4 w-full md:w-auto">
                        <button
                            onClick={downloadTemplate}
                            className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm font-medium text-gray-700"
                        >
                            <Download size={18} />
                            Download Template
                        </button>
                        {preview.length > 0 && (
                            <button
                                onClick={handleUpload}
                                disabled={isUploading}
                                className="bg-[#2C4276] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2 shadow-sm font-medium disabled:opacity-50"
                            >
                                {isUploading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
                                {isUploading ? "Uploading..." : `Upload ${preview.length} Questions`}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Upload Area */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="p-8">
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-all cursor-pointer hover:border-[#2C4276] hover:bg-gray-50 ${file ? "border-green-400 bg-green-50/30" : "border-gray-200"}`}
                    >
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".xlsx,.csv" className="hidden" />
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${file ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                            {file ? <CheckCircle2 size={32} /> : <Upload size={32} />}
                        </div>
                        <h2 className="text-lg font-bold text-gray-900 mb-1">
                            {file ? "File Loaded Successfully" : "Upload Question File"}
                        </h2>
                        <p className="text-gray-400 text-sm text-center max-w-sm">
                            {file ? `${file.name} — ${preview.length} questions parsed` : "Drag & drop or click to select an XLSX or CSV file"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Questions Preview Table */}
            {preview.length > 0 && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4 border-b bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div className="text-sm font-medium text-gray-600">
                            {filteredPreview.length} of {preview.length} questions
                        </div>
                        <div className="flex gap-3">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search questions..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none text-sm w-56 text-gray-600"
                                />
                                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                            </div>
                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger className="h-10 w-40 border rounded-lg text-sm">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="aptitude">Aptitude</SelectItem>
                                    <SelectItem value="logical">Logical</SelectItem>
                                    <SelectItem value="quantitative">Quantitative</SelectItem>
                                    <SelectItem value="verbal">Verbal</SelectItem>
                                    <SelectItem value="technical">Technical</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="custom-scrollbar-container overflow-x-scroll overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 h-[430px] sm:max-h-[600px] border-t pb-4 sm:pb-0">
                        <table className="w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 border-b sticky top-0 z-10">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-16">#</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Question</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Options</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {filteredPreview.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-20">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <AlertCircle className="text-gray-400" size={32} />
                                            </div>
                                            <p className="text-gray-500 text-lg font-medium">No questions match your filter</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredPreview.map((q, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{idx + 1}</td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-medium text-gray-900 max-w-md">{q.question}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {q.options.map((opt, i) => (
                                                        <span
                                                            key={i}
                                                            className={`px-2 py-0.5 rounded text-[11px] font-medium border ${opt.isCorrect ? "bg-green-50 border-green-200 text-green-700 font-bold" : "bg-white border-gray-200 text-gray-500"}`}
                                                        >
                                                            {String.fromCharCode(65 + i)}. {opt.text}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getCategoryColor(q.category)}`}>
                                                    {q.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => setPreview(prev => prev.filter((_, i) => i !== idx))}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Remove"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
