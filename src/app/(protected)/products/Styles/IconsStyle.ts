import { IconButtonProps } from "@chakra-ui/react"

export const styleIcon: IconButtonProps = {
  variant: "ghost",
  size: "md",
  borderRadius: "full",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.15s ease",

  color: {
    _light: "#757575",
    _dark: "white",
  },

  _hover: {
    bg: {
      _light: "gray.100",
      _dark: "#1C1C1E",
    },
    color: {
      _light: "#1976D2",
      _dark: "#90CAF9",
    },
  },

  _before: {
    content: '""',
    position: "absolute",
    left: "50%",
    top: "50%",
    width: "10px",
    height: "10px",
    borderRadius: "full",
    bg: {
      _light: "rgba(25,118,210,0.4)",
      _dark: "rgba(144,202,249,0.4)",
    },
    transform: "translate(-50%, -50%) scale(0)",
    opacity: 0,
    pointerEvents: "none",
  },
}
