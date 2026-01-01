import { ColorLabel, fontSizeTitleLabel } from "@/themes"
import { Field, Input , InputGroup, Textarea} from "@chakra-ui/react"

interface FormFieldProps {
    label: string,
    type: string,
    inputType?: typeInput
    placeholder?: string,
    error?: string,
}
type typeInput =  'norma' | 'InputGroup' | 'textArea'

//Componente Para padronizar input e mensagem de erro no formulario
export const InputField = ({ label, error, type, inputType, placeholder }: FormFieldProps) => {
    return (

        <Field.Root invalid={!!error} flex="1" minW={"200px"} h={'80px'}>
            <Field.Label color={ColorLabel} fontSize={fontSizeTitleLabel}> {label} </Field.Label>
            {inputType
                ? <InputGroup startAddon="$" endAddon="USD">
                    <Input placeholder="0.00" />
                </InputGroup>
                :
                <Input type={type} placeholder={placeholder} />
            }

            <Field.ErrorText>{error}</Field.ErrorText>
        </Field.Root>
    )
}