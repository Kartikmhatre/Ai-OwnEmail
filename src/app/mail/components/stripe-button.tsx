'use client'
import { Button } from '@/components/ui/button'
import React from 'react'

const StripeButton = () => {
    // Stripe removed - button does nothing now
    return (
        <Button variant="outline" disabled>
            Premium (Enabled)
        </Button>
    )
}

export default StripeButton
