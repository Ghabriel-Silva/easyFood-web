import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json()

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/company/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    })

    const data = await res.json()

    if (!res.ok) {
        return NextResponse.json(data, { status: res.status })
    }

    const response = NextResponse.json(data)
    response.cookies.set("token", data.data.token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 3600000,
        path: "/"
    })

    return response
}