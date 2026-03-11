import { EmptyState, VStack } from "@chakra-ui/react"
import { HiColorSwatch } from "react-icons/hi"


interface PropsStatEmpaty {
    title: string,
    description: string
}
export const StatEmpaty = ({ title, description }: PropsStatEmpaty) => {
    return (
        <EmptyState.Root >
            <EmptyState.Content>
                <EmptyState.Indicator>
                    <HiColorSwatch />
                </EmptyState.Indicator>
                <VStack textAlign="center">
                    <EmptyState.Title>{title}</EmptyState.Title>
                    <EmptyState.Description>
                        {description}
                    </EmptyState.Description>
                </VStack>             
            </EmptyState.Content>
        </EmptyState.Root>
    )
}
