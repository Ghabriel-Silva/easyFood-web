import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {ConfigPage} from "./ConfigPage";

export default async function Config() {
    const cookieStore = await  cookies();
    const token = cookieStore.get("token")?.value;


    if (!token) {
        redirect("/login");
    }

    return <ConfigPage />;
}
