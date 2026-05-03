import { NextResponse, type NextRequest, type MiddlewareConfig } from "next/server";

// Rotas públicas (não exigem login)
const publicRoutes = [
    { path: "/login", whenAuthenticatedRedirectTo: "/orders" },
];

// Rota para onde redirecionar quando NÃO está autenticado
const REDIRECT_WHEN_NOT_AUTHENTICATED = "/login";


export async function middleware(request: NextRequest) {
    console.log("MIDDLEWARE RODOU:", request.nextUrl.pathname)

    const path = request.nextUrl.pathname;
    const publicRoute = publicRoutes.find((route) => route.path === path);
    const authToken = request.cookies.get("token")?.value;

    console.log("PATH:", path)
    console.log("TOKEN:", authToken ? "existe" : "não existe")

    // 1 Se NÃO tem token e está tentando acessar rota pública → OK pode passar 
    if (!authToken && publicRoute) {
        return NextResponse.next();
    }

    // se não tem token e está tentando acessar rota PRIVADA → REDIRECT
    if (!authToken && !publicRoute) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
        return NextResponse.redirect(redirectUrl);
    }

    // se tem token e está na rota pública (ex: /login)
    if (authToken && publicRoute) {
        if (publicRoute.whenAuthenticatedRedirectTo) {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = publicRoute.whenAuthenticatedRedirectTo;
            return NextResponse.redirect(redirectUrl);
        }
        return NextResponse.next();
    }

    // se tem token e está em rota privada → deixa passar SEM verificar JWT
    if (authToken && !publicRoute) {
        return NextResponse.next();
    }

}

export const config: MiddlewareConfig = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};