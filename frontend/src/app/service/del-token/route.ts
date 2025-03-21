'use server'
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function DELETE() {
    const cookieStore = await cookies();
    cookieStore.delete('token');

    return NextResponse.json({
        message: 'cookies deleted'
    });
}