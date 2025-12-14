import { Button, Box } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";

export const CreateOrders = () => {
    return (
        <Box><Button bg="blue.600" borderRadius="lg">Novo Pedido <MdAdd /></Button></Box>
    )
}