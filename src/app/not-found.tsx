"use client";

import { Box, Text, Button, VStack, Heading } from "@chakra-ui/react";
import Link from "next/link";
import NextImage from "next/image";
import image from "@/assets/errornotfound.png";
import styles from "@/styles/not-found.module.css";



export default function NotFound() {
    return (
        <Box
            h="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="gray.50"
            px={4}
        >
            <VStack gap={6} textAlign="center" maxW="600px" w="full" className={styles.fadeIn}>
                <Heading size="3xl" color="blue.600" fontWeight="extrabold" className={styles.float}>
                    404
                </Heading>

                <Box width="100%" height="300px" position="relative" className={styles.float_slow}>
                    <NextImage
                        src={image}
                        alt="Error 404 - Página não encontrada"
                        fill
                        style={{ objectFit: "contain" }}
                    />
                </Box>

                <Heading size="xl" color="gray.700" className={styles.fade_up}>
                    Página não encontrada
                </Heading>

                <Text fontSize="lg" color="gray.600" className={styles.fade_up}>
                    A página que você tentou acessar não existe ou foi movida.
                    <br />
                    Você pode voltar para a página inicial.
                </Text>

                <Link href="/home">
                    <Button
                        bg="blue.600"
                        color="white"
                        size="lg"
                        borderRadius="lg"
                        px={10}
                        fontWeight="bold"
                        className={styles.button_animate}
                    >
                        Voltar ao início
                    </Button>
                </Link>
            </VStack>
        </Box>
    );
}
