"use client";

import { Box, Flex, Heading, Button, Input, Text, Field, Stack, Link } from "@chakra-ui/react";
import { useForm } from "react-hook-form"
import { PasswordInput } from "@/components/ui/password-input"
import { useState } from "react";
import { toaster, Toaster } from "@/components/ui/toaster";
import image from "@/assets/image2.jpg"
import Image from "next/image";
import { useRouter } from "next/navigation";


interface LoginValues {
    email: string,
    password: string
}

export default function Login() {

    const router = useRouter()
    const numeroWhatss: string | undefined = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
    const message: string = "Olá! Preciso de ajuda para entrar no Sistema.";
    const url: string = `https://wa.me/${numeroWhatss}?text=${encodeURIComponent(message)}`;


    const [loading, setLoading] = useState<boolean>(false)
    //inicialmente estado estara falso, quando eu chamar minha api meu estado tem que mudar para true e quando a respota chegar eu deixo falso e vou redirecional para a procima pagian

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginValues>()

    const onSubmit = async (data: LoginValues) => {
        setLoading(true); //  começa o loading

        const loginPromise = fetch("http://localhost:8080/company/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
        })
            .then(async (res) => {
                const result = await res.json()
                if (!res.ok) throw result
                return result;
            })
            .finally(() => {
                setLoading(false); //  finaliza o loading SEMPRE (sucesso ou erro)
            });


        return toaster.promise(loginPromise, {
            loading: { title: "Atualizando...", description: "Aguarde um momento" },
            success: (data) => {
                router.push("/config")
                return {
                    title: "Sucesso!",
                    description: data.message,
                    closable: true,
                    duration: 2000,
                }
            },
            error: (err: any) => ({
                title: "Erro!",
                description: err.message || "Falha ao atualizar",
                closable: true,
                duration: 2000,
            }),
        });
    };




    return (
        <Flex h="100vh">
            {/* Lado esquerdo - imagem */}

            <Box
                flex="1"
                w="50%"               // metade da largura
                h="100vh"             // altura total da página
                bgSize="cover"
                backgroundPosition="center"
                display={{ base: "none", md: "block" }}
                overflow="hidden"
            >
                <Image
                    src={image}
                    alt="Foto"
                    style={{
                        width: "100%",     // ocupa toda a largura da box
                        height: "100%",    // ocupa toda altura da box
                        objectFit: "cover" // garante que a imagem preencha sem distorcer
                    }}
                />
            </Box>

            <Flex flex={1} align="center" justify="center" p={10}>
                <Box w="full" maxW="md">
                    <Heading size="4xl" color="red.solid" mb={4} textAlign="center">
                        Easy Food
                    </Heading>
                    <Heading size="2xl" mb={6} textAlign="center">
                        Login
                    </Heading>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <Stack mb={2} >
                            <Box mb={4}>
                                <Field.Root invalid={!!errors.email}>
                                    <Field.Label>
                                        Email <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Input placeholder="me@gmail.com" {...register("email", {
                                        required: "O e-mail é obrigatório.",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@(gmail|hotmail)\.com$/,
                                            message: "Use um e-mail válido do Gmail ou Hotmail"
                                        }
                                    })} />
                                    <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                                    <Field.HelperText>Nunca compartilhe seu email.</Field.HelperText>
                                </Field.Root>
                            </Box>
                            <Box mb={4}>
                                <Field.Root invalid={!!errors.password}>
                                    <Field.Label>
                                        Senha <Field.RequiredIndicator />
                                    </Field.Label>
                                    <PasswordInput placeholder="@senha123"  {...register("password", {
                                        required: "A senha é obrigatória.",
                                        minLength: {
                                            value: 6,
                                            message: "A senha deve ter no mínimo 6 caracteres."
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: "A senha deve ter no máximo 30 caracteres."
                                        }
                                    })} />
                                    <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
                                </Field.Root>
                            </Box>
                            <Button type="submit" width="100%" colorScheme="orange" mt={4} loading={loading} loadingText="Validando  dados...">
                                Entrar
                            </Button>
                        </Stack>
                    </form>
                    <Text textStyle="xs" textAlign="center">
                        Dificuldades para acessar? Entre em{" "}
                        <Link
                            variant="underline"
                            href={url}
                            colorPalette="teal"
                            target="_blank"
                        >
                            Contato
                        </Link>{" "}
                    </Text>
                </Box>
            </Flex>
            <Toaster />
        </Flex>
    );
}
