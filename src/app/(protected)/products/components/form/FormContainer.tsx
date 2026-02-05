
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { CreateProductsInterface, CreateProductsSchema } from "../../validations/create-products"
import { yupResolver } from "@hookform/resolvers/yup"
import { HStack, Input, Stack, InputGroup } from "@chakra-ui/react"
import { FormField } from "@/ui/index"
import { Switch } from "@chakra-ui/react"
import { HiCheck, HiX } from "react-icons/hi"
import { useState } from "react"
import { UniMedidaSelect , SwitchInput} from "@/app/(protected)/products/components/index"



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
                    <HStack align={"flex-end"}>
                        <FormField label={`Quantidade: ${checked ? "Sim" : "Não"}`} >
                            <SwitchInput checked={checked} onChange={setChecked} />
                        </FormField>
                    </HStack>
                    <HStack align={"start"}> 
                        {checked && (
                            <FormField label="Quantidade" error={errors.quantity?.message}>
                                <InputGroup startElement="Qt">
                                    <Input {...register('quantity')} placeholder="0.00" />
                                </InputGroup>
                            </FormField>
                        )}
                        <FormField label="Uni Medida" error={errors.uni_Medida?.message}>
                            <UniMedidaSelect />
                        </FormField>
                    </HStack>
                </Stack>
            </form>
        </FormProvider>
    )
}