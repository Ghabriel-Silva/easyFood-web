import { ColorLabel, fontSizeTitleLabel } from "@/theme/ChakraUI/themes"
import { Field } from "@chakra-ui/react"

interface FormFieldProps {
    label?: string
    error?: string,
    fullWidth?: boolean
    children: React.ReactNode
}

//Componente Para padronizar input e mensagem de erro no formulario
export const FormField = ({ label, error, fullWidth, children }: FormFieldProps) => {
    return (
        <Field.Root
            invalid={!!error}
            flex={fullWidth ? "0 0 100%" : "1"} //Força ocupar a linha interira ou dividir espaço se false
            minW={fullWidth ? "100%" : "200px"}
        >
            {label && (
                <Field.Label color={ColorLabel} fontSize={fontSizeTitleLabel} >
                    {label}
                </Field.Label>
            )}
            {children}
            {error && <Field.ErrorText>{error}</Field.ErrorText>}
        </Field.Root>
    )
}
