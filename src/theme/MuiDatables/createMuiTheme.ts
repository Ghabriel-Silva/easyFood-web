import { createTheme } from "@mui/material/styles"

export function getMuiTheme(colorMode: "light" | "dark") {
    return createTheme({

        palette: {
            mode: colorMode,
            background: {
                default: colorMode === "dark" ? "#09090B" : "#ffffff",
                paper: colorMode === "dark" ? "#09090B" : "#ffffff",
            },
        },
        components: {
            MuiPaper: {
                styleOverrides: {
                    root: {
                        default: colorMode === "dark" ? "#09090B" : "#ffffff",
                        backgroundImage: "none",
                    },
                },
            },

            MuiTableCell: {
                styleOverrides: {
                    root: {
                        default: colorMode === "dark" ? "#09090B" : "#ffffff",
                        color: colorMode === "dark" ? "#fcfcfc" : "#000000",           
                    },
                },

            },

            MuiTableRow: {
                styleOverrides: {
                    root: {
                        default: colorMode === "dark" ? "#09090B" : "#ffffff",                     
                    },
                },
            },
        },
    })
}
