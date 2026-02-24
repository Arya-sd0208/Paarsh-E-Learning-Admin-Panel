import { LucideIcon, TrendingUp } from "lucide-react";
import React from "react";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    showMonthToggle?: boolean;
}

export function StatsCard({ title, value, icon: Icon, trend, showMonthToggle }: StatsCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-lg border-t-4 border-blue-500 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-700">{title}</p>
                        {showMonthToggle && (
                            <select className="text-[10px] bg-blue-50 border-none rounded px-1 py-0.5 outline-none text-blue-600 font-medium">
                                <option>Month</option>
                            </select>
                        )}
                    </div>
                </div>
                <div className="text-blue-500 bg-blue-50 p-1.5 rounded-lg">
                    <Icon size={18} />
                </div>
            </div>

            <div>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>

            {trend && (
                <div className="flex items-center gap-1.5 text-blue-500 mt-auto">
                    <TrendingUp size={14} />
                    <span className="text-xs font-medium">{trend}</span>
                </div>
            )}
        </div>
    );
}
