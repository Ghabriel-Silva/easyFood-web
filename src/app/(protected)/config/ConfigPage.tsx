"use client";

import { Box, Text, Input, Button, Stack, Field } from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster";
import { useForm } from "react-hook-form";


interface FormConfigValue {
    name: string
    defaultFreight: number
}

export default  function ConfigPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormConfigValue>();

    const formSubmite = handleSubmit((data) => console.log(data))
 
    return (
        <Box maxW="400px" mx="auto" mt="50px" p="20px" border="1px solid #ccc" borderRadius="10px">
            <Text fontSize="2xl" mb="4" fontWeight="bold">
                Atualizar Config
            </Text>

            <form onSubmit={formSubmite}>
                <Stack gap={4}>
                    <Field.Root invalid={!!errors.name}>
                        <Field.Label>First name</Field.Label>
                        <Input {...register("name")} />
                        <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!errors.defaultFreight}>
                        <Field.Label>Last name</Field.Label>
                        <Input {...register("defaultFreight")} />
                        <Field.ErrorText>{errors.defaultFreight?.message}</Field.ErrorText>
                    </Field.Root>

                    <Button type="submit">Submit</Button>
                    <Button type="submit" color="white" background="blue.500">
                        Salvar
                    </Button>
                </Stack>

                <Toaster />
            </form>
        </Box>
    );
};


