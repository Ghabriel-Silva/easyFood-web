import { TableText } from "@/ui/index";
import { HStack, Badge } from "@chakra-ui/react";
import { MdOutlineAlarmOff, MdInfoOutline, MdAccessTime } from "react-icons/md";
// Importações do date-fns
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

    // 1. parseISO interpreta "2026-04-28" corretamente sem mudar o dia
    const dataValidade = parseISO(date);
    const hoje = new Date();

    // 2. differenceInCalendarDays compara apenas as datas (ignora as horas)
    // Se hoje é dia 27 e a validade é dia 28, o resultado será 1.
    const diffDays = differenceInCalendarDays(dataValidade, hoje);

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
                {/* Formatação segura e localizada */}
                {format(dataValidade, "dd/MM/yyyy", { locale: ptBR })}
            </TableText>
        </HStack>
    );
};