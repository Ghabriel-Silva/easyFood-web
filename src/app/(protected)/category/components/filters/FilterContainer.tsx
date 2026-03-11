import { ButtonFilter, FormField } from "@/ui/index"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { FilterCategorySchema, FilterCategoryType } from "@/app/(protected)/category/validations/filterValidations"
import { yupResolver } from "@hookform/resolvers/yup"
import { HStack, Box, Flex } from "@chakra-ui/react"
import { SelectStatusFilter } from "@/app/(protected)/category/components/index"
import { useFilterStoreCategory } from "@/stores/filterStoreCstegory"



export const FilterContainer = () => {
    const methodos = useForm({
        resolver: yupResolver(FilterCategorySchema),
        mode: "onBlur"
    })

    const {
        handleSubmit,
        formState: { errors }
    } = methodos

     const setFilter = useFilterStoreCategory((state) => state.setFilter)

  
    const onSubmit: SubmitHandler<FilterCategoryType> = (dataFilter) => {
        setFilter(dataFilter)
    }

    return (
        <FormProvider {...methodos}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <Flex flexDirection="column" gap={2} pb={2}>
                        <FormField label="Status" error={errors.status?.message}>
                            <SelectStatusFilter />
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