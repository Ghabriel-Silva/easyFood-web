import { ButtonFilter, FormField } from "@/ui/index"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { FilterProductsSchema, FilterProductsType } from "../../validations/filter-products"
import { yupResolver } from "@hookform/resolvers/yup"
import { HStack, Box, Flex } from "@chakra-ui/react"
import { SelectPrice, SelectStatus } from "@/app/(protected)/products/components/index"
import { useFilterStore } from "@/stores/filterStore"
import { useRouter, usePathname, useSearchParams } from "next/navigation"



export const FilterContainer = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const methodos = useForm({
        resolver: yupResolver(FilterProductsSchema),
        mode: 'onBlur'
    })
    const {
        handleSubmit,
        formState: { errors }
    } = methodos
    
    const setFilter = useFilterStore((state) => state.setFilter)

    const onSubmit: SubmitHandler<FilterProductsType> = (dataFilter) => {
        setFilter(dataFilter) 

        const params = new URLSearchParams(searchParams.toString())

        if (dataFilter.price) params.set("price", dataFilter.price)
        else params.delete("price")

        if (dataFilter.status) params.set("status", dataFilter.status)
        else params.delete("status")

        params.set("page", "1") 

        router.push(`${pathname}?${params.toString()}`)
    }
    return (
        <FormProvider {...methodos}>
            <form onSubmit={handleSubmit(onSubmit)} >
                <Box >
                    <Flex flexDirection={"column"} gap={2} pb={2}  >
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