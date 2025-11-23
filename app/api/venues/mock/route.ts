import { NextResponse } from "next/server";

const VENUE_OPTIONS = [
    {
        id: "1",
        name: "TechHub Lagos",
        capacity: 100,
        cost: 500,
        location: "Lagos, Nigeria",
        amenities: ["WiFi", "Projector", "Coffee"],
    },
    {
        id: "2",
        name: "Innovation Center",
        capacity: 50,
        cost: 300,
        location: "Lagos, Nigeria",
        amenities: ["WiFi", "Whiteboard"],
    },
    {
        id: "3",
        name: "Grand Hall",
        capacity: 500,
        cost: 2000,
        location: "Lagos, Nigeria",
        amenities: ["Stage", "Sound System", "Banquet"],
    },
];

export async function GET() {
    return NextResponse.json(VENUE_OPTIONS);
}
