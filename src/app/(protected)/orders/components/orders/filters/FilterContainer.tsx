import { SimpleGrid } from "@chakra-ui/react"
import { ButtonFilter, SelectFilterPayment, SelectFilterStatus, InputInicialDate, InputFinalDate, SelectAsyncClient } from "@/app/(protected)/orders/components/orders/filters/index"
import { SubmitHandler, useForm, } from "react-hook-form"
import { filterOrderSchema,  FilterOrderSchemaInterface } from "../../../validations/filter-orders"
import { yupResolver } from "@hookform/resolvers/yup"


export const FilterContainer = () => {

    const methods = useForm({
        resolver: yupResolver(filterOrderSchema),
        mode: 'onBlur'
    })

    const {
        handleSubmit,
        formState: { errors }
    } = methods

    const onSubmite:SubmitHandler<FilterOrderSchemaInterface> = (data: FilterOrderSchemaInterface) => {
            console.log('chamando ')
    }
    return (

        <SimpleGrid minChildWidth="250px" gap={4} pb={4} bg={"bg.subtle"}>
            <form onSubmit={handleSubmit(onSubmite)}>
                <InputInicialDate />
                <InputFinalDate />
                <SelectFilterStatus />
                <SelectFilterPayment />
                <SelectAsyncClient />
                <ButtonFilter/>
            </form>
        </SimpleGrid>


    )
}