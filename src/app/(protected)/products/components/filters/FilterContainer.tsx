import { OpcionalView } from "@/ui/index"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { FilterProductsSchema, FilterProductsType } from "../../validations/filter-products"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Input } from "@chakra-ui/react"



export const FilterContainer = () => {

    const methodos = useForm({
        resolver: yupResolver(FilterProductsSchema),
        mode: 'onBlur'
    })


    const {
        handleSubmit,
    } = methodos

    const onSubmit: SubmitHandler<FilterProductsType> = (data: FilterProductsType) => {
        console.log(data)
    }
    return (
        <OpcionalView title="Filtrar Produtos">
            <FormProvider {...methodos}>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <Input />
                </form>
            </FormProvider>

        </OpcionalView>
    )
}