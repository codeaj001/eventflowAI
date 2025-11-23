import { Button } from "@/components/ui/button";
import { OrchestrateChat } from "@/components/OrchestrateChat";
import Link from "next/link";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";

export function LandingHero() {
    return (
        <div className="relative isolate pt-14 dark:bg-gray-900">
            <div className="py-24 sm:py-32 lg:pb-40">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                            Plan your next event with <span className="text-blue-600">AI Superpowers</span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            EventFlow AI leverages IBM watsonx Orchestrate to handle venues, catering, invites, and more. Just ask.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link href="/dashboard/demo-event">
                                <Button size="lg" className="gap-2">
                                    View Demo Dashboard <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                            <a href="#chat" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                                Try the Agent <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>

                    <div id="chat" className="mt-16 flow-root sm:mt-24">
                        <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                            <OrchestrateChat />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
