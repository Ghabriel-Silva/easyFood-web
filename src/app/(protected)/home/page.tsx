import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import HomePage from "./HomePage";

export default  async function home() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  const res = await fetch("http://localhost:8080/company/me", {
    method:"GET", 
    headers: {
      Cookie: `token=${token}`
    }
  })
  if(!res.ok){
    redirect("/login")
  }

  return <HomePage/>
}
