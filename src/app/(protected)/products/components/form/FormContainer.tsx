
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { CreateProductsInterface, CreateProductsSchema } from "../../validations/create-products"
import { yupResolver } from "@hookform/resolvers/yup"
import { HStack, Input, Stack, InputGroup } from "@chakra-ui/react"
import { FormField } from "@/ui/index"
import { Switch } from "@chakra-ui/react"
import { HiCheck, HiX } from "react-icons/hi"
import { useState } from "react"


export const FormContainer = () => {
    const methods = useForm({
        resolver: yupResolver(CreateProductsSchema),
        mode: 'onBlur',
        defaultValues: {

        }
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = methods

    const OnSubmit: SubmitHandler<CreateProductsInterface> = (data: unknown) => {
        if (!data) return
        console.log(data)
    }


    const [checked, setChecked] = useState(false)
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(OnSubmit)} >
                <Stack>
                    <HStack align={"start"}>
                        <FormField error={errors.name?.message} label="Nome">
                            <Input {...register('name')} placeholder="X-Calabresa" />
                        </FormField>
                        <FormField label="price" error={errors.price?.message}>
                            <InputGroup startElement="R$" endElement="BLR">
                                <Input placeholder="0.00" inputMode="decimal" {...register('price')} />
                            </InputGroup>
                        </FormField>
                    </HStack>
                    <HStack>

                        <FormField label="Quantidade Sim/Não" error={errors.quantity?.message}>
                            <Switch.Root size="lg" checked={checked}
                                colorPalette={"blue"}
                                onCheckedChange={(e) => setChecked(e.checked)}>
                                <Switch.HiddenInput />
                                <Switch.Control>
                                    <Switch.Thumb>
                                        <Switch.ThumbIndicator fallback={<HiX color="black" />}>
                                            <HiCheck />
                                        </Switch.ThumbIndicator>
                                    </Switch.Thumb>
                                </Switch.Control>
                            </Switch.Root>
                            {checked && (
                                <InputGroup startElement="Qt">
                                    <Input {...register('quantity')} placeholder="0.00" />
                                </InputGroup>
                            )}
                        </FormField>
                    </HStack>
                </Stack>
            </form>
        </FormProvider>
    )
}