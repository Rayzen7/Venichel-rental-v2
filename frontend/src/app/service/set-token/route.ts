'use server'
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(req: Request) {
    const cookieStore = await cookies();
    const body = await req.json()
    
    const token = body.token;
    cookieStore.set("token", token, {
        httpOnly: true,
        path: '/'
    });    

    return NextResponse.json({
        message: 'token set success'
    })
}