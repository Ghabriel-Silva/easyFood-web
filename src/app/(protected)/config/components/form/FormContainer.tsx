import {
    Flex,
    Stack,
    Input,
    SimpleGrid,
    Alert,
    Heading,
    Button
} from "@chakra-ui/react"
import { FormField } from "@/ui"
import { fontTitle, fontWeigthTitle } from "@/theme/ChakraUI/themes"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { EditeInfoUserSchema, EditeInfoUserType } from "../../validations/editeInfos"
import { ContatoInput } from "@/app/(protected)/config/components/index"
import { useEditeInfoUser } from "../../hooks/useEditeInfoUser"
export const FormContainer = () => {

    const methodos = useForm({
        mode: "onBlur",
        resolver: yupResolver(EditeInfoUserSchema)
    })
    const {
        register,
        handleSubmit,
        formState: { errors }

    } = methodos

    const { mutate, isPending } = useEditeInfoUser()
    const OnSubmite: SubmitHandler<EditeInfoUserType> = (data) => {
        mutate(data)
    }



    return (
        <FormProvider {...methodos}>
            <Flex flex={3} p="8" boxShadow={"sm"} flexDirection={"column"}  >
                <form onSubmit={handleSubmit(OnSubmite)} noValidate>
                    <Heading size={fontTitle} fontWeight={fontWeigthTitle}>Informações de Usuário</Heading>
                    <Stack gap="8" mt={"50px"}>
                        <Stack gap="5">
                            <FormField label="Nome do Estabelecimento" isRequired error={errors.name?.message}>
                                <Input
                                    placeholder="Ex: EasyFood"
                                    {...register('name')}
                                />
                                <FormField label="Frete Padrão" isRequired error={errors.defaultFreight?.message}>
                                    <Input {...register("defaultFreight")}  placeholder="ex:7.00"/>
                                </FormField>
                            </FormField>
                            <Flex  flexWrap={"wrap"} gap="4">
                                <FormField label="Telefone" isRequired error={errors.customerPhone?.message}>
                                    <ContatoInput />
                                </FormField>

                                <FormField label="E-mail de Contato" >
                                    <Input disabled
                                        value={'ghambriel@mgail.com'}
                                    />

                                </FormField>
                            </Flex>
                            <FormField label="Endereço Completo" isRequired error={errors.customerAddress?.message}>
                                <Input
                                    {...register('customerAddress')}
                                    placeholder="Rua, Número, Bairro, Cidade..."
                                />
                            </FormField>
                            <Alert.Root status="info">
                                <Alert.Indicator />
                                <Alert.Description>
                                    As informações acima serão exibidas para seus clientes no checkout e nos recibos de impressão.
                                </Alert.Description>
                            </Alert.Root>
                        </Stack>
                    </Stack>
                    <Button
                        type="submit"
                        loading={isPending}
                        loadingText="Salvando Alterações"
                        spinnerPlacement="start"
                        mt={"20px"}
                        bg="blue.600"
                        borderRadius="lg"
                    >
                        Salvar Alterações
                    </Button>
                </form>
            </Flex>
        </FormProvider>
    )
}