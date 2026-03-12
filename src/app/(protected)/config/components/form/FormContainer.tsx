import { useState } from "react"
import {
    Box,
    Stack,
    Input,
    SimpleGrid,
    Alert,
    Heading
} from "@chakra-ui/react"

import { Field } from "@chakra-ui/react"
export const FormContainer = () => {
    // Estado para capturar todos os dados do formulário
    const [formData, setFormData] = useState({
        nome: "",
        telefone: "",
        email: "",
        endereco: "",
        fontSize: "M"
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <Box flex={2} p="8" minW={"280px"}  boxShadow={"sm"}> 
            <Heading>Informações de Usuário</Heading>
            <Stack gap="8" mt={"50px"}>
                <Stack gap="5">
                    <Field.Root>
                        <Field.Label fontWeight="bold">Nome do Estabelecimento</Field.Label>
                        <Input
                            name="nome"
                            placeholder="Ex: EasyFood"
                            value={formData.nome}
                            onChange={handleChange}

                        />
                    </Field.Root>

                    <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                        <Field.Root>
                            <Field.Label fontWeight="bold">Telefone</Field.Label>
                            <Input
                                name="telefone"
                                placeholder="(00) 00000-0000"
                                value={formData.telefone}
                                onChange={handleChange}
                            />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label fontWeight="bold">E-mail de Contato</Field.Label>
                            <Input
                                name="email"
                                type="email"
                                placeholder="contato@loja.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Field.Root>
                    </SimpleGrid>

                    <Field.Root>
                        <Field.Label fontWeight="bold">Endereço Completo</Field.Label>
                        <Input
                            name="endereco"
                            placeholder="Rua, Número, Bairro, Cidade..."
                            value={formData.endereco}
                            onChange={handleChange}
                        />
                    </Field.Root>

                    <Alert.Root status="info">
                        <Alert.Indicator />
                        <Alert.Description>
                            As informações acima serão exibidas para seus clientes no checkout e nos recibos de impressão.
                        </Alert.Description>
                    </Alert.Root>
                </Stack>


            </Stack>
        </Box>
    )
}