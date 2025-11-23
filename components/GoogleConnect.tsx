"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { CheckCircle2, LogOut } from "lucide-react";

export function GoogleConnect() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    async function checkUser() {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        setLoading(false);
    }

    async function handleLogin() {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/agent`,
                scopes: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/gmail.send",
            },
        });
    }

    async function handleLogout() {
        await supabase.auth.signOut();
    }

    if (loading) return <div className="text-sm text-gray-500">Loading...</div>;

    if (user) {
        return (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                        {user.email?.[0].toUpperCase()}
                    </div>
                    <div className="flex-1">
                        <p className="font-medium text-sm text-green-900 dark:text-green-100">Connected</p>
                        <p className="text-xs text-green-700 dark:text-green-300">{user.email}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleLogout} title="Disconnect">
                        <LogOut className="w-4 h-4 text-green-600" />
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">G</div>
                    <div>
                        <p className="font-medium text-sm">Google Account</p>
                        <p className="text-xs text-gray-500">Calendar & Gmail</p>
                    </div>
                </div>
            </div>
            <Button
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
                Connect Google Account
            </Button>
        </div>
    );
}
