import { Button, Input, VStack } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { dashboardDateSchema, dashboardDateType } from "../../validations/dashbord"
import { yupResolver } from "@hookform/resolvers/yup"
import { FormField } from "@/ui"
import { useFilterStoreDashboard } from "@/stores/filterStoreDashbord"

const formatToString = (d: Date | null | undefined): string | undefined => {
    if (!d || isNaN(d.getTime())) return undefined
    return d.toISOString().split('T')[0]
}

// helper pra datas
const today = new Date()
const thirtyDaysAgo = new Date()
thirtyDaysAgo.setDate(today.getDate() - 30)

export const DataInput = () => {
    const methods = useForm({
        resolver: yupResolver(dashboardDateSchema),
        mode: 'onBlur',
        shouldUnregister: false,
    })

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = methods


    const setFilter = useFilterStoreDashboard((set) => set.setFilter)

    const onSubmit = (dataFilter: dashboardDateType) => {
        setFilter(dataFilter)
    }




    return (
        <VStack p={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormField error={errors.initial?.message} label="Incial">
                    <Input type={"date"} {...register("initial")} defaultValue={formatToString(thirtyDaysAgo)} />
                </FormField>

                <FormField error={errors.final?.message} label="Final">
                    <Input type={"date"} {...register("final")} defaultValue={formatToString(today)} />
                </FormField>
                <Button
                    type="submit"
                    colorPalette="blue"
                    w="100%"
                    size="sm"
                >
                    Buscar
                </Button>
            </form>
        </VStack>
    )
}