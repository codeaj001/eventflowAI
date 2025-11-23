"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area"; // Need to add scroll-area if not present, or use div
import { Check, X, HelpCircle } from "lucide-react";

interface RSVP {
    id: string;
    name: string;
    email: string;
    status: "attending" | "declined" | "maybe";
}

interface RSVPListProps {
    rsvps: RSVP[];
}

export function RSVPList({ rsvps }: RSVPListProps) {
    const stats = {
        attending: rsvps.filter((r) => r.status === "attending").length,
        declined: rsvps.filter((r) => r.status === "declined").length,
        maybe: rsvps.filter((r) => r.status === "maybe").length,
    };

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>RSVPs</span>
                    <Badge variant="outline">{rsvps.length} Total</Badge>
                </CardTitle>
                <div className="flex gap-4 text-sm text-gray-500 mt-2">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        {stats.attending}
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        {stats.declined}
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        {stats.maybe}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                    {rsvps.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">No RSVPs yet</p>
                    ) : (
                        rsvps.map((rsvp) => (
                            <div key={rsvp.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div>
                                    <p className="font-medium text-sm">{rsvp.name}</p>
                                    <p className="text-xs text-gray-500">{rsvp.email}</p>
                                </div>
                                <div>
                                    {rsvp.status === "attending" && <Check className="w-4 h-4 text-green-500" />}
                                    {rsvp.status === "declined" && <X className="w-4 h-4 text-red-500" />}
                                    {rsvp.status === "maybe" && <HelpCircle className="w-4 h-4 text-yellow-500" />}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
