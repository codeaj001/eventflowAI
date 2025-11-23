"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { EventHeader } from "@/components/dashboard/EventHeader";
import { BudgetChart } from "@/components/dashboard/BudgetChart";
import { RSVPList } from "@/components/dashboard/RSVPList";
import { TaskList } from "@/components/dashboard/TaskList";
import { OrchestrateChat } from "@/components/OrchestrateChat";
import confetti from "canvas-confetti";

// Mock data for demo
const DEMO_EVENT = {
    id: "demo",
    name: "React Workshop Lagos",
    description: "A hands-on workshop for React developers.",
    date: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days from now
    location: "TechHub Lagos",
    budget: 3500,
    status: "planning",
};

const DEMO_TASKS = [
    { id: "1", title: "Find Venue", status: "done", agent_name: "Venue Scout" },
    { id: "2", title: "Book Catering", status: "in_progress", agent_name: "Catering Agent" },
    { id: "3", title: "Send Invites", status: "pending", agent_name: "Invitation Agent" },
];

const DEMO_RSVPS = [
    { id: "1", name: "Alice Doe", email: "alice@example.com", status: "attending" },
    { id: "2", name: "Bob Smith", email: "bob@example.com", status: "maybe" },
];

export default function DashboardPage() {
    const params = useParams();
    const eventId = params.eventId as string;
    const isDemo = eventId === "demo-event";

    const [event, setEvent] = useState<any>(isDemo ? DEMO_EVENT : null);
    const [tasks, setTasks] = useState<any[]>(isDemo ? DEMO_TASKS : []);
    const [rsvps, setRsvps] = useState<any[]>(isDemo ? DEMO_RSVPS : []);

    useEffect(() => {
        if (isDemo) return;

        // Fetch initial data
        const fetchData = async () => {
            const { data: eventData } = await supabase.from("events").select("*").eq("id", eventId).single();
            if (eventData) setEvent(eventData);

            const { data: taskData } = await supabase.from("tasks").select("*").eq("event_id", eventId);
            if (taskData) setTasks(taskData);

            const { data: rsvpData } = await supabase.from("rsvps").select("*").eq("event_id", eventId);
            if (rsvpData) setRsvps(rsvpData);
        };

        fetchData();

        // Realtime subscriptions
        const channel = supabase
            .channel("dashboard")
            .on("postgres_changes", { event: "*", schema: "public", table: "events", filter: `id=eq.${eventId}` }, (payload) => {
                const newEvent = payload.new as any;
                setEvent(newEvent);
                if (newEvent.status === "completed") {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 },
                    });
                }
            })
            .on("postgres_changes", { event: "*", schema: "public", table: "tasks", filter: `event_id=eq.${eventId}` }, (payload) => {
                // Refresh tasks or update state manually
                fetchData(); // Simplest for now
            })
            .on("postgres_changes", { event: "*", schema: "public", table: "rsvps", filter: `event_id=eq.${eventId}` }, (payload) => {
                fetchData();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [eventId, isDemo]);

    if (!event) return <div className="p-8 text-center">Loading Event...</div>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                <EventHeader event={event} />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <BudgetChart budget={event.budget || 0} />
                            <RSVPList rsvps={rsvps} />
                        </div>
                        {/* Embedded Chat for context */}
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                            <h2 className="text-lg font-semibold mb-4">Orchestrate Agent</h2>
                            <OrchestrateChat />
                        </div>
                    </div>

                    <div className="md:col-span-1">
                        <TaskList tasks={tasks} />
                    </div>
                </div>
            </div>
        </div>
    );
}
