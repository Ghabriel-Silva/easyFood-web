"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()


export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider forcedTheme="light" attribute="class" disableTransitionOnChange>
        <QueryClientProvider  client={queryClient}>
          {props.children}
          </QueryClientProvider>
      </ThemeProvider>
    </ChakraProvider>
  )
}