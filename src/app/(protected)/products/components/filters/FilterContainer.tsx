import { OpcionalView, ButtonFilter, FormField } from "@/ui/index"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { FilterProductsSchema, FilterProductsType } from "../../validations/filter-products"
import { yupResolver } from "@hookform/resolvers/yup"
import { HStack, Box, Flex } from "@chakra-ui/react"
import { SelectPrice, SelectStatus } from "@/app/(protected)/products/components/index"



export const FilterContainer = () => {

    const methodos = useForm({
        resolver: yupResolver(FilterProductsSchema),
        mode: 'onBlur'
    })


    const {
        handleSubmit,
        formState: { errors }
    } = methodos

    const onSubmit: SubmitHandler<FilterProductsType> = (data: FilterProductsType) => {
        console.log(data)
    }
    return (  
            <FormProvider {...methodos}>
                <form onSubmit={handleSubmit(onSubmit)} >
            
                    <Box >
                        <Flex flexWrap={"wrap"} gap={4} pb={4} alignItems={"start"} >
                            <FormField label="Preço" error={errors.price?.message} >
                                <SelectPrice />
                            </FormField>
                            <FormField label="Status" error={errors.status?.message}>
                                <SelectStatus />
                            </FormField>
                        </Flex>
                        <HStack>
                            <ButtonFilter textDefault="Filtrar Produtos" />
                        </HStack>
                    </Box>
                </form>
            </FormProvider>
    )
}