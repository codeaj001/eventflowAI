"use client";

import { useEffect, useState } from "react";

export function OrchestrateChat() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="w-full h-[600px] border rounded-xl overflow-hidden shadow-lg bg-white relative">
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 -z-10">
                <p className="text-gray-500">Loading Orchestrate...</p>
            </div>
            {/* Replace src with your actual Orchestrate embed URL */}
            <iframe
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXp4eW54eW54eW54eW54eW54eW54eW54eW54eW54eW54eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPEqDGUULpEU0aQ/giphy.gif"
                className="w-full h-full"
                title="Orchestrate Chat"
                style={{ border: "none" }}
            />
            {/* 
        NOTE: In a real implementation, you would use the script embed or iframe provided by IBM.
        For the hackathon, you might need to paste the specific integration code here.
      */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/5 p-2 text-xs text-center text-gray-500">
                IBM watsonx Orchestrate Embed Placeholder
            </div>
        </div>
    );
}
