import { NextResponse, type NextRequest, type MiddlewareConfig } from "next/server";

const publicRoutes = [
    { path: "/login", whenAuthenticatedRedirectTo: "/orders" },
];

const REDIRECT_WHEN_NOT_AUTHENTICATED = "/login";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const publicRoute = publicRoutes.find((route) => route.path === path);
    const authToken = request.cookies.get("token")?.value;

    if (!authToken && publicRoute) return NextResponse.next();

    if (!authToken && !publicRoute) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
        return NextResponse.redirect(redirectUrl);
    }

    if (authToken && publicRoute) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = publicRoute.whenAuthenticatedRedirectTo!;
        return NextResponse.redirect(redirectUrl);
    }

    // valida o token chamando o backend
    if (authToken && !publicRoute) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/company/me`, {
                headers: {
                    Cookie: `token=${authToken}` // envia o token pro backend validar
                }
            })

            if (res.ok) return NextResponse.next();
            throw new Error("invalido")
        } catch {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
            const response = NextResponse.redirect(redirectUrl);
            response.cookies.set("token", "", { maxAge: 0, path: "/" });
            return response;
        }
    }
}

export const config: MiddlewareConfig = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};