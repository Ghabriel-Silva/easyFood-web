import { Input } from "@chakra-ui/react"

interface PropsDateInput {
    type: string
    onChange: (value: string) => void
    value?: string,
    placeholder?: string,
}


export function InputBase({ type, onChange, value, placeholder }: PropsDateInput) {

    return (
        <Input
            size="sm"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    )
}