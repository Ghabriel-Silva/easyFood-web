import { NextRequest, NextResponse } from "next/server";

async function handler(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const authToken = request.cookies.get("token")?.value

    if (!authToken) {
        return NextResponse.json({ message: "Não autorizado" }, { status: 401 })
    }

    const { path } = await params
    const pathString = path.join("/")
    const searchParams = request.nextUrl.searchParams.toString()
    const url = `${process.env.NEXT_PUBLIC_URL_API}/${pathString}${searchParams ? `?${searchParams}` : ""}`

    const isGet = request.method === "GET"
    const body = isGet ? undefined : await request.json()

    const res = await fetch(url, {
        method: request.method,
        headers: {
            "Content-Type": "application/json",
            Cookie: `token=${authToken}`
        },
        ...(body && { body: JSON.stringify(body) })
    })

    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
}

export const GET = handler
export const POST = handler
export const PUT = handler
export const PATCH = handler
export const DELETE = handler