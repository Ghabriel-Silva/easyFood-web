"use client"

import { SelectBase } from "@/ui/index"
import { Controller, useFormContext } from "react-hook-form"
import { CreateProductsInterface } from "../../../validations/create-products"
import { useMemo } from "react"
import { useCategoryData } from "../../../hooks/useCategoryData"
import { createListCollection } from "@chakra-ui/react"
import { CategoryReponseDataAPI } from "../../../interfaces/categorys"

export const SelectCategoryInput = () => {
    const { control } = useFormContext<CreateProductsInterface>()
    const { data, isLoading, isError } = useCategoryData()


    const categoryArray = useMemo<CategoryReponseDataAPI[]>(() => {
        return data?.data ?? []
    }, [data])


    const collection = useMemo(() => {
        return createListCollection({
            items: categoryArray ?? [],
            itemToString: (category) => category.name,
            itemToValue: (category) => category.id
        })
    }, [categoryArray])

    const transformedItems = collection.items.map((category) => ({
        label: category.name,
        value: category.id,
    }));

    return (
        <Controller
            control={control}
            name="category_id"
            render={({ field }) => (
                <SelectBase
                    isError={isError}
                    mesageError={data?.message ?? 'Categorias não encontrada, atualize e tente novamente'}
                    isLoading={isLoading}
                    close={true}
                    isMultiple={false}
                    size="md"
                    placeholder="Selecione a Categoria"
                    items={transformedItems}
                    value={field.value ? [field.value] : []}
                    onChange={(values) => {
                        const value = values[0] ?? null
                        field.onChange(value)
                    }}
                />
            )}
        />
    )
}