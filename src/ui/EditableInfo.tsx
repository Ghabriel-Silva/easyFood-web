import { fontText } from "@/theme/ChakraUI/themes"
import { Editable, IconButton } from "@chakra-ui/react"
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu"

interface PropsValue {
    value: string
}

export const EditableInfo = ({ value }: PropsValue) => {
    return (
        <Editable.Root value={value} fontSize={fontText}>
            <Editable.Preview />
            <Editable.Input />
            <Editable.Control>
                <Editable.EditTrigger asChild>
                    <IconButton variant="ghost" size="xs">
                        <LuPencilLine />
                    </IconButton>
                </Editable.EditTrigger>
                <Editable.CancelTrigger asChild>
                    <IconButton variant="outline" size="xs">
                        <LuX />
                    </IconButton>
                </Editable.CancelTrigger>
                <Editable.SubmitTrigger asChild>
                    <IconButton variant="outline" size="xs">
                        <LuCheck />
                    </IconButton>
                </Editable.SubmitTrigger>
            </Editable.Control>
        </Editable.Root>
    )
}
