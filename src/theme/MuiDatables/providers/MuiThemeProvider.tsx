"use client"

import { ThemeProvider } from "@mui/material/styles"
import { ReactNode, useMemo } from "react"
import { useColorMode } from "@/components/ui/color-mode"
import { getMuiTheme } from "@/theme/MuiDatables/createMuiTheme"

export function MuiThemeProvider({ children }: { children: ReactNode }) {
    const { colorMode } = useColorMode() //rcebe light ou dark quando a mudança

    const theme = useMemo(
        () => getMuiTheme(colorMode), //recebe light ou dark 
        [colorMode]
    )

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
