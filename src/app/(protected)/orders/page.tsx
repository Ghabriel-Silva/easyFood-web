import { cookies } from "next/headers";
import OrderPage from "./components/orders/table/OrderPage";
import { redirect } from "next/navigation";


export default async function home() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) redirect("/login");
  
  return <OrderPage token={token!} />;
}
