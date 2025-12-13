import { type NextRequest, NextResponse } from 'next/server';

// Stripe checkout removed
export async function GET(request: NextRequest) {
    return NextResponse.redirect(new URL('/mail', request.url));
}
