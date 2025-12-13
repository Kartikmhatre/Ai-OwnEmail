import { getAccountDetails, getAurinkoToken } from "@/lib/aurinko";
import { waitUntil } from '@vercel/functions'
import { db } from "@/server/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

    // Ensure user exists in database
    const user = await currentUser();
    if (user) {
        await db.user.upsert({
            where: { id: userId },
            update: {
                emailAddress: user.emailAddresses[0]?.emailAddress ?? '',
                firstName: user.firstName,
                lastName: user.lastName,
                imageUrl: user.imageUrl,
            },
            create: {
                id: userId,
                emailAddress: user.emailAddresses[0]?.emailAddress ?? '',
                firstName: user.firstName,
                lastName: user.lastName,
                imageUrl: user.imageUrl,
            }
        });
    }

    const params = req.nextUrl.searchParams
    const status = params.get('status');
    if (status !== 'success') return NextResponse.json({ error: "Account connection failed" }, { status: 400 });

    const code = params.get('code');
    const token = await getAurinkoToken(code as string)
    if (!token) return NextResponse.json({ error: "Failed to fetch token" }, { status: 400 });
    
    const accountDetails = await getAccountDetails(token.accessToken)
    
    // Check if account already exists by token
    const existingAccount = await db.account.findUnique({
        where: { token: token.accessToken }
    });

    let accountId: string;
    
    if (existingAccount) {
        accountId = existingAccount.id;
        await db.account.update({
            where: { id: existingAccount.id },
            data: { token: token.accessToken }
        });
    } else {
        const newAccount = await db.account.create({
            data: {
                userId,
                token: token.accessToken,
                provider: 'Aurinko',
                emailAddress: accountDetails.email,
                name: accountDetails.name
            }
        });
        accountId = newAccount.id;
    }

    waitUntil(
        axios.post(`${process.env.NEXT_PUBLIC_URL}/api/initial-sync`, { accountId, userId }).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err.response?.data)
        })
    )

    return NextResponse.redirect(new URL('/mail', req.url))
}
