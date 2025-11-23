import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, content } = body;

        // In a real app, use @notionhq/client here
        // For now, we mock the success
        console.log("Creating Notion page:", title);

        return NextResponse.json({
            success: true,
            url: "https://notion.so/mock-event-page-123",
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
