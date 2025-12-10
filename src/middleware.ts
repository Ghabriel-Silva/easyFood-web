import { NextResponse, type NextRequest, type MiddlewareConfig } from "next/server";
import { jwtVerify } from "jose";

// Rotas públicas (não exigem login)
const publicRoutes = [
    { path: "/login", whenAuthenticatedRedirectTo: "/orders" },
];

// Rota para onde redirecionar quando NÃO está autenticado
const REDIRECT_WHEN_NOT_AUTHENTICATED = "/login";

// Chave secreta (NÃO use NEXT_PUBLIC aqui)
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
    console.log("🟦 TOKEN NO MIDDLEWARE:", request.cookies.get("token")?.value);

    const path = request.nextUrl.pathname;

    const publicRoute = publicRoutes.find((route) => route.path === path);
    const authToken = request.cookies.get("token")?.value;

    // 1️⃣ Se NÃO tem token e está tentando acessar rota pública → OK
    if (!authToken && publicRoute) {
        return NextResponse.next();
    }

    // 2️⃣ Se NÃO tem token e está tentando acessar rota PRIVADA → REDIRECT
    if (!authToken && !publicRoute) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
        return NextResponse.redirect(redirectUrl);
    }

    // 3️⃣ Se tem token **e está na rota pública** (ex: /login)
    if (authToken && publicRoute) {
        // Se rota diz que usuário autenticado deve ser redirecionado
        if (publicRoute.whenAuthenticatedRedirectTo) {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = publicRoute.whenAuthenticatedRedirectTo;
            return NextResponse.redirect(redirectUrl);
        }

        return NextResponse.next();
    }

    // 4️⃣ Se tem token e está em rota privada → verificar JWT
    if (authToken && !publicRoute) {
        try {
            await jwtVerify(authToken, SECRET);
            return NextResponse.next();
        } catch (err) {
            console.log("🔴 JWT INVÁLIDO OU EXPIRADO:", err);

            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
            return NextResponse.redirect(redirectUrl);
        }
    }

    return NextResponse.next();
}

// ==== MATCHER GLOBAL (pega toda sua aplicação) ====
export const config: MiddlewareConfig = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
