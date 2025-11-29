import { NextResponse } from "next/server";

export function authRoutes(req) {
    const token = req.cookies.get("token")?.value

    if (!token && req.nextUrl.pathname.startsWhit('/protected')) {
         console.log('deu erro aqui no midlleware ')
        return NextResponse.redirect(new URL("/login", req.url))
    }

    return NextResponse.next();


}

export const config = {
    matcher: ["/protected/:config"],
};