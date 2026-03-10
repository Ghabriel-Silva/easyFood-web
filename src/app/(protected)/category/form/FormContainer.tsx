import { Input } from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { createCategorySchema, createCategoryInterface } from "../validations/createCategory"
import { FormField } from "@/ui/index"
import { useCategoryCreate } from "../hooks/useCategoryCreate"

type formFatherCategory = {
    formRef: React.RefObject<HTMLFormElement | null>,
    success:()=>void
}


export const FormContainerCategory = ({ formRef, success }: formFatherCategory) => {
    const methodos = useForm({
        resolver: yupResolver(createCategorySchema),
        mode: "onBlur"
    })
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = methodos

    const { mutate } = useCategoryCreate()

    const OnSubmit: SubmitHandler<createCategoryInterface> = (data: createCategoryInterface) => {
        mutate(data, {
            onSuccess: ()=>{
                success()
            }
        })
    }

    return (
        <FormProvider {...methodos}>
            <form ref={formRef} noValidate onSubmit={handleSubmit(OnSubmit)}>
                <FormField label={"Nome categoria"} error={errors.name?.message} isRequired={true}>
                    <Input {...register("name")} placeholder="ex: Assados" />
                </FormField>
            </form>
        </FormProvider>
    )
}