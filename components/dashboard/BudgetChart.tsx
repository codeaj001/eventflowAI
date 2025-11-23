"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface BudgetChartProps {
    budget: number;
    spent?: number; // In a real app, this would come from expenses table
}

export function BudgetChart({ budget, spent = 0 }: BudgetChartProps) {
    // Mock distribution for demo
    const data = [
        { name: "Venue", value: budget * 0.4 },
        { name: "Catering", value: budget * 0.3 },
        { name: "Marketing", value: budget * 0.1 },
        { name: "Misc", value: budget * 0.2 },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Budget Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="text-center mt-4">
                    <p className="text-2xl font-bold">${budget.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Total Budget</p>
                </div>
            </CardContent>
        </Card>
    );
}
