import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const authToken = request.cookies.get("token")?.value

    if (!authToken) {
        return NextResponse.json({ message: "Não autorizado" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams.toString()
    const url = `${process.env.NEXT_PUBLIC_URL_API}/product${searchParams ? `?${searchParams}` : ""}`

    const res = await fetch(url, {
        headers: {
            Cookie: `token=${authToken}`
        }
    })

    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
}