import { Inter } from "next/font/google"
import Provider from "./provider"
import { Toaster } from "@/components/ui/toaster";



const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})




//todas as rotas recebem edições feitas
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={inter.className} suppressHydrationWarning>
      <head />
      <body>
        <Provider>       
          {children} 
          <Toaster />
        </Provider>
      </body>
    </html>
  )
}