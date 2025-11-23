"use client";

import { useEffect, useRef } from "react";

declare global {
    interface Window {
        wxOConfiguration: any;
        wxoLoader: any;
    }
}

export function OrchestrateChat() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scriptLoaded = useRef(false);

    useEffect(() => {
        if (scriptLoaded.current) return;
        scriptLoaded.current = true;

        // Configuration from the "Live" snippet
        window.wxOConfiguration = {
            orchestrationID: "20251123-0753-5252-80d4-1b59105bda87_20251123-0754-4725-600c-3b5aa865c89a",
            hostURL: "https://dl.watson-orchestrate.ibm.com",
            rootElementID: "orchestrate-chat-container",
            chatOptions: {
                agentId: "8d0de621-c6ae-4819-be6c-3c88aeb44217",
                agentEnvironmentId: "59308206-6cb3-4b98-8971-5bb7d7b53993",
            },
        };

        // Use setTimeout to ensure DOM is ready (as per snippet)
        setTimeout(() => {
            const script = document.createElement("script");
            script.src = `${window.wxOConfiguration.hostURL}/wxochat/wxoLoader.js?embed=true`;
            script.async = true;
            script.addEventListener("load", function () {
                if (window.wxoLoader) {
                    window.wxoLoader.init();
                }
            });
            document.head.appendChild(script);
        }, 0);

        // Handle Auth Token Request
        const authHandler = (event: any) => {
            console.warn("Orchestrate requested an auth token. Ensure 'Anonymous Access' is enabled in IBM Agent Builder or implement token exchange.");
            // If you have a token endpoint, you would fetch it here and call:
            // event.detail.resolve(token);
        };

        window.addEventListener('authTokenNeeded', authHandler);

        return () => {
            // Cleanup if necessary
            window.removeEventListener('authTokenNeeded', authHandler);
        };
    }, []);

    return (
        <div className="w-full h-[600px] border rounded-xl overflow-hidden shadow-lg bg-white relative">
            {/* The container where Orchestrate will inject the chat */}
            <div
                id="orchestrate-chat-container"
                ref={containerRef}
                className="w-full h-full"
            />
        </div>
    );
}
