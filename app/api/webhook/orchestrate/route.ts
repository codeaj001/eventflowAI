import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("Webhook received:", body);

        // Verify Secret
        const secret = request.headers.get("x-webhook-secret");
        const expectedSecret = process.env.ORCHESTRATE_WEBHOOK_SECRET;

        if (expectedSecret && secret !== expectedSecret) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { action, payload } = body;

        if (!action) {
            return NextResponse.json({ error: "Missing action" }, { status: 400 });
        }

        let result;

        switch (action) {
            case "create_event":
                // payload: { name, description, date, budget, location }
                const { data: event, error: eventError } = await supabase
                    .from("events")
                    .insert([payload])
                    .select()
                    .single();
                if (eventError) throw eventError;
                result = event;
                break;

            case "add_task":
                // payload: { event_id, title, agent_name }
                const { data: task, error: taskError } = await supabase
                    .from("tasks")
                    .insert([payload])
                    .select()
                    .single();
                if (taskError) throw taskError;
                result = task;
                break;

            case "update_task":
                // payload: { id, status }
                const { data: updatedTask, error: updateError } = await supabase
                    .from("tasks")
                    .update({ status: payload.status })
                    .eq("id", payload.id)
                    .select()
                    .single();
                if (updateError) throw updateError;
                result = updatedTask;
                break;

            case "add_rsvp":
                // payload: { event_id, name, email, status }
                const { data: rsvp, error: rsvpError } = await supabase
                    .from("rsvps")
                    .insert([payload])
                    .select()
                    .single();
                if (rsvpError) throw rsvpError;
                result = rsvp;
                break;

            case "complete_event":
                // payload: { event_id }
                const { data: completedEvent, error: completeError } = await supabase
                    .from("events")
                    .update({ status: "completed" })
                    .eq("id", payload.event_id)
                    .select()
                    .single();
                if (completeError) throw completeError;
                result = completedEvent;
                break;

            default:
                return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }

        return NextResponse.json({ success: true, data: result });
    } catch (error: any) {
        console.error("Webhook error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
