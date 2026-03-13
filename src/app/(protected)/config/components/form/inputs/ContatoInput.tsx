import { Input } from "@chakra-ui/react"
import { Controller, useFormContext } from "react-hook-form"
import { withMask } from "use-mask-input"
import { EditeInfoUserType } from "../../../validations/editeInfos"

export const ContatoInput = () => {

    const { control } = useFormContext<EditeInfoUserType>()
    return (

        <Controller
            name="customerPhone"
            control={control}
            render={({ field }) => (
                <Input
                    {...field}
                    value={field.value ?? ""}
                    placeholder="(99) 99999-9999"
                    ref={withMask("(99) 99999-9999")}
                />
            )}
        />
    )
}