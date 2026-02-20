import {  ButtonFilter, FormField, TableText } from "@/ui/index"
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
                        <Flex flexDirection={"column"}  gap={2} pb={2}  >                                
                            <FormField label="Preço" error={errors.price?.message} >
                                <SelectPrice />
                            </FormField>
                            <FormField label="Status" error={errors.status?.message}>
                                <SelectStatus />
                            </FormField>
                        </Flex>
                        <HStack>
                            <ButtonFilter size="xs" textDefault="Filtrar Produtos" />
                        </HStack>
                    </Box>
                </form>
            </FormProvider>
    )
}