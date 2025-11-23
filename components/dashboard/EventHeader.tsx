"use client";

import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface EventHeaderProps {
    event: any;
}

export function EventHeader({ event }: EventHeaderProps) {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        if (!event?.date) return;
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const eventDate = new Date(event.date).getTime();
            const distance = eventDate - now;

            if (distance < 0) {
                setTimeLeft("Event Started");
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        }, 1000);

        return () => clearInterval(interval);
    }, [event?.date]);

    if (!event) return null;

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{event.name}</h1>
                    <p className="text-gray-500 mt-2">{event.description}</p>
                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                        </div>
                        <div className="flex items-center gap-1">
                            <Badge variant={event.status === "confirmed" ? "default" : "secondary"}>
                                {event.status}
                            </Badge>
                        </div>
                    </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center min-w-[150px]">
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider mb-1">
                        Countdown
                    </div>
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-300 font-mono">
                        {timeLeft || "--"}
                    </div>
                </div>
            </div>
        </div>
    );
}
