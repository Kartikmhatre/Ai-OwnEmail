import { NextResponse } from "next/server";

// Stripe webhook removed
export async function POST(req: Request) {
    return NextResponse.json({ message: "Stripe disabled" }, { status: 200 });
}
