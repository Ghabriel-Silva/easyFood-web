
import { Field } from "@chakra-ui/react"
import { ReactNode } from "react"

interface FormFieldProps {
    label: string
    error?: string
    children: ReactNode
}

export const FormField = ({ label, error, children }: FormFieldProps) => {
    return (
        
        <Field.Root invalid={!!error} flex="1" minW={"200px"}>
            <Field.Label> {label} </Field.Label>
            {children}
            <Field.ErrorText>{error}</Field.ErrorText>
        </Field.Root>
    )
}