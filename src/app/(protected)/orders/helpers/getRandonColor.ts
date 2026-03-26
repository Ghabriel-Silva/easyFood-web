//Função que sorteia uma cor 
 const colorPalettes = {
        blue: "blue",
        red: "red",
        green: "green",
        pink: "pink",
        orange: "orange",
        yellow: "yellow",
        purple: "purple",
        teal: "teal",
        cyan: "cyan",
        gray: "gray",
    }

export function getRandonColor(): string {
  const colors = Object.values(colorPalettes)
  const randonIndex = Math.floor(Math.random() * colors.length)
  return colors[randonIndex]
}

 