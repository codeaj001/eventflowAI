import { NextResponse } from "next/server";

const CATERING_OPTIONS = [
    {
        id: "1",
        name: "Mama Put Delight",
        type: "Local",
        cost_per_person: 15,
        menu_items: ["Jollof Rice", "Fried Plantain", "Chicken"],
    },
    {
        id: "2",
        name: "Healthy Bites",
        type: "Vegan",
        cost_per_person: 20,
        menu_items: ["Quinoa Salad", "Fruit Platter", "Smoothies"],
    },
    {
        id: "3",
        name: "Pizza Party",
        type: "Italian",
        cost_per_person: 12,
        menu_items: ["Pepperoni", "Margherita", "Garlic Bread"],
    },
];

export async function GET() {
    return NextResponse.json(CATERING_OPTIONS);
}
