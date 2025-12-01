import { NextResponse, NextRequest } from "next/server";

export function authRoutes(req:NextRequest) {
    const token = req.cookies.get("token")?.value

    if (!token && req.nextUrl.pathname.startsWith('/protected')) {  
        return NextResponse.redirect(new URL("/login", req.url))
    }

    return NextResponse.next();


}

export const config = {
    matcher: ["/protected/:path*"],
};