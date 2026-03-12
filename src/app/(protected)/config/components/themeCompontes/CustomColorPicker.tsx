"use client"

import { useState } from "react"
import { ColorPicker, HStack, Portal, VStack, parseColor } from "@chakra-ui/react"
import { LuCheck } from "react-icons/lu"

const swatches = ["#3182ce", "#805ad5", "#e53e3e", "#38a169", "#dd6b20"]

export const CustomColorPicker = () => {
  const [color, setColor] = useState(parseColor(swatches[0]))

  return (
    <VStack gap="4">
      <ColorPicker.Root
        value={color}
        onValueChange={(e) => setColor(e.value)} 
        maxW="200px"
      >
        <ColorPicker.HiddenInput />
        <ColorPicker.Label fontSize={"md"}>Cor do Tema</ColorPicker.Label>
        
        <ColorPicker.Control>
          <ColorPicker.Input />
          <ColorPicker.Trigger />
        </ColorPicker.Control>

        <Portal>
          <ColorPicker.Positioner>
            <ColorPicker.Content>
              <ColorPicker.Area />           
              <HStack>
                <ColorPicker.EyeDropper size="xs" variant="outline" />
                <ColorPicker.Sliders />
              </HStack>       
              <ColorPicker.SwatchGroup>
                {swatches.map((item) => (
                  <ColorPicker.SwatchTrigger key={item} value={item}>
                    <ColorPicker.Swatch value={item} boxSize="4.5">
                      <ColorPicker.SwatchIndicator>
                        <LuCheck />
                      </ColorPicker.SwatchIndicator>
                    </ColorPicker.Swatch>
                  </ColorPicker.SwatchTrigger>
                ))}
              </ColorPicker.SwatchGroup>
            </ColorPicker.Content>
          </ColorPicker.Positioner>
        </Portal>
      </ColorPicker.Root>
    </VStack>
  )
}