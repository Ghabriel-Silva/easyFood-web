import { TableText } from "@/ui/index";
import { HStack, Badge } from "@chakra-ui/react";
import { MdOutlineAlarmOff, MdInfoOutline, MdAccessTime } from "react-icons/md";
import { parseISO, differenceInCalendarDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PropsValidade {
    date: string | null;
}

export const ValidadeMensage = ({ date }: PropsValidade) => {
    if (!date) {
        return (
            <Badge colorPalette={"green"} gap={2}>
                <MdAccessTime />
                Produto Perecível
            </Badge>
        );
    }

 
    const dataValidade = parseISO(date)
    const hoje = new Date()

    const diffDays = differenceInCalendarDays(dataValidade, hoje)

    if (diffDays < 0) {
        return (
            <Badge colorPalette={"red"} gap={2}>
                <MdOutlineAlarmOff />
                Produto Vencido
            </Badge>
        );
    }

    if (diffDays <= 10) {
        return (
            <Badge colorPalette={"yellow"} gap={2}>
                <MdInfoOutline />
                Faltam {diffDays} dia(s) para vencer
            </Badge>
        );
    }

    return (
        <HStack>
            <TableText>
                {format(dataValidade, "dd/MM/yyyy", { locale: ptBR })}
            </TableText>
        </HStack>
    );
};