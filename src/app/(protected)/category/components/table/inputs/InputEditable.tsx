import { fontText } from "@/theme/ChakraUI/themes"
import { Editable, IconButton } from "@chakra-ui/react"
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu"
import { useCategoryMutateName } from "../../../hooks/useCategoryMutateName"

interface PropsEditable {
    id: string
    name: string,
    isDefault?: boolean
}
export const InputEditable = ({ id, name, isDefault }: PropsEditable) => {

    const { mutate } = useCategoryMutateName()

    const payloudMutateName = {
        id: id,
        name: undefined
    }

    return (
        <Editable.Root
            defaultValue={name}
            disabled={isDefault}
            fontSize={fontText}
            onValueCommit={(detais) => mutate({
                ...payloudMutateName,
                name: detais.value
            })}
        >
            <Editable.Preview cursor="not-allowed" />
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
