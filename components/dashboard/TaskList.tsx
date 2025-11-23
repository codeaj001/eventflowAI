"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

interface Task {
    id: string;
    title: string;
    status: "pending" | "in_progress" | "done";
    agent_name: string;
}

interface TaskListProps {
    tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Agent Tasks</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {tasks.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">No tasks active</p>
                    ) : (
                        tasks.map((task) => (
                            <div key={task.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                                <div className="mt-1">
                                    {task.status === "done" && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                                    {task.status === "in_progress" && <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />}
                                    {task.status === "pending" && <Circle className="w-5 h-5 text-gray-300" />}
                                </div>
                                <div>
                                    <p className={`text-sm font-medium ${task.status === "done" ? "line-through text-gray-400" : ""}`}>
                                        {task.title}
                                    </p>
                                    <p className="text-xs text-blue-600 mt-0.5">
                                        Assigned to: {task.agent_name}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
