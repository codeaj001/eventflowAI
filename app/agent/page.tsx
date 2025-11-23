"use client";

import { OrchestrateChat } from "@/components/OrchestrateChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GoogleConnect } from "@/components/GoogleConnect";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AgentPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <Link href="/">
                        <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent hover:text-blue-600">
                            <ArrowLeft className="w-4 h-4" /> Back to Home
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Instructions & Connections */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="mb-4">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">EventFlow Agent</h1>
                            <p className="text-gray-500 mt-2">
                                Your AI assistant for planning events. Connect your tools to get started.
                            </p>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Required Connections</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                                    <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">How to Connect</h3>
                                    <p className="text-sm text-blue-600 dark:text-blue-400">
                                        When you ask the agent to perform an action (like sending an invite), it will ask you to sign in to your accounts securely via IBM.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <GoogleConnect />

                                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-md border">
                                        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold">N</div>
                                        <div className="flex-1">
                                            <p className="font-medium text-sm">Notion</p>
                                            <p className="text-xs text-gray-500">For documentation</p>
                                        </div>
                                        <CheckCircle2 className="w-4 h-4 text-gray-300" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: The Chat Interface */}
                    <div className="lg:col-span-2">
                        <OrchestrateChat />
                    </div>
                </div>
            </div>
        </div>
    );
}
