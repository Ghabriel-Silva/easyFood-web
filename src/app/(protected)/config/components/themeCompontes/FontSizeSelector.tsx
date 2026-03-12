"use client"

import { useState } from "react"
import { CheckboxCard, HStack, VStack, Text } from "@chakra-ui/react"

const fontSizes = ["P", "M", "G", "XG"]

export const FontSizeSelector = () => {
    const [selectedSize, setSelectedSize] = useState("M")

    return (
        <VStack  gap="4">
            <Text fontWeight="bold" fontSize="lg">
                Tamanho da Fonte
            </Text>

            <HStack gap="2">
                {fontSizes.map((size) => (
                    <CheckboxCard.Root
                        key={size}
                        value={size}
                        
                        checked={selectedSize === size}
                        onCheckedChange={() => setSelectedSize(size)}
                        maxW="60px" 
                        justify="center"
                    >
                        <CheckboxCard.HiddenInput />
                        <CheckboxCard.Control px="4" py="2">
                            <CheckboxCard.Label fontWeight="medium">
                                {size}
                            </CheckboxCard.Label>
                        </CheckboxCard.Control>
                    </CheckboxCard.Root>
                ))}
            </HStack>

            <Text fontSize="sm" color="gray.500">
                Tamanho selecionado no estado: <b>{selectedSize}</b>
            </Text>
        </VStack>
    )
}