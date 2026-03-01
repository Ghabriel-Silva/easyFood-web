import { Flex, Input, HStack, Box } from "@chakra-ui/react"
import { SelectFilterPayment, SelectFilterStatus, InputInicialDate, InputFinalDate } from "@/app/(protected)/orders/components/orders/filters/index"
import { FormProvider, SubmitHandler, useForm, } from "react-hook-form"
import { filterOrderSchema, FilterOrderSchemaInterface } from "../../../validations/filter-orders"
import { yupResolver } from "@hookform/resolvers/yup"
import { FormField, ButtonFilter} from "@/ui/index"
import { getDateToFilter } from "../../../helpers/getDateToFilter"

interface FilterContainerProps {
    onFilterChange: (data: FilterOrderSchemaInterface) => void
    isLoadingButton: boolean
    isErrorResetField: boolean
}


export const FilterContainer = ({ onFilterChange, isLoadingButton, isErrorResetField }: FilterContainerProps) => {

    const methods = useForm({
        resolver: yupResolver(filterOrderSchema),
        mode: "onSubmit",
        defaultValues: {
            finalDate: getDateToFilter(0),
            startDate: getDateToFilter(1)
        }

    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = methods

    const onSubmite: SubmitHandler<FilterOrderSchemaInterface> = (data: FilterOrderSchemaInterface) => {
        console.log(data)
        onFilterChange(data)
        if (isErrorResetField === true) {
            reset({
                status: [],
                paymentMethod: [],
                clientName: "",
            })
        }

    }
    return (
        <FormProvider {...methods} >

            <form onSubmit={handleSubmit(onSubmite)}>
                <Box p={2} borderRadius={"sm"} borderWidth={"1px"} mb={2}  >
                    <Flex flexWrap={"wrap"} gap={4} pb={4} alignItems={"start"} >
                        <FormField label="Data inicial" error={errors.startDate?.message}>
                            <InputInicialDate />
                        </FormField>
                        <FormField label="Data Final" error={errors.finalDate?.message}>
                            <InputFinalDate />
                        </FormField>
                        <FormField label="Status Pedido">
                            <SelectFilterStatus />
                        </FormField>
                        <FormField label="Método de pagamento">
                            <SelectFilterPayment />
                        </FormField>
                        <FormField label="Buscar Cliente" >
                            <Input  {...register('clientName')} placeholder="Buscar Pedido por Cliente" />
                        </FormField>
                    </Flex>
                    <HStack>
                        <ButtonFilter isLoading={isLoadingButton} />
                    </HStack>
                </Box>
            </form>
        </FormProvider>


    )
}