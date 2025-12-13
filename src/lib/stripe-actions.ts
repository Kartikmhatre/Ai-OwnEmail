'use server'

import { auth } from "@clerk/nextjs/server";

// Stripe removed - these are placeholder functions
export async function createCheckoutSession() {
    const { userId } = await auth();
    if (!userId) {
        throw new Error('User not found');
    }
    // Stripe functionality removed
    return null;
}

export async function createBillingPortalSession() {
    const { userId } = await auth();
    if (!userId) {
        throw new Error('User not found');
    }
    // Stripe functionality removed
    return null;
}

export async function getSubscriptionStatus() {
    const { userId } = await auth();
    if (!userId) {
        return false;
    }
    // Always return true (premium) since Stripe is removed
    return true;
}
