import { IconButtonProps } from "@chakra-ui/react"

export const styleIcon = (active: boolean): IconButtonProps => ({
  variant: "ghost",
  size: "md",
  borderRadius: "full",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.15s ease",


  color: active
    ? { _light: "#1976D2", _dark: "#90CAF9" }
    : { _light: "#757575", _dark: "white" },

  bg: "transparent",

  _hover: !active ? {
    bg: { _light: "gray.100", _dark: "#1C1C1E" },
    color: { _light: "#1976D2", _dark: "#90CAF9" }
  } : undefined

})