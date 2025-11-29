import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import ConfigPage from "./ConfigPage";

export default async function Config() {
    const cookieStore = await  cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch("http://localhost:8080/company/me", {
        method: "GET",
        headers: {
            Cookie: `token=${token}`, 
        }
    });

    if (!res.ok) {
        redirect("/login");
    }

    return <ConfigPage />;
}
