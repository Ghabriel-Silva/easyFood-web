import { TableText } from "@/ui/index";
import { HStack, Badge } from "@chakra-ui/react";
import { MdOutlineAlarmOff, MdInfoOutline, MdAccessTime } from "react-icons/md";


interface PropsValidade {
    date: string | null
}

export const ValidadeMensage = ({ date }: PropsValidade) => {

    if (!date) return (
        <Badge colorPalette={"green"} gap={2}>
            < MdAccessTime />
            Produto Perecivel
        </Badge>
    )

    const dV = new Date(date) // Data de validade
    const hoje = new Date()   // Data atual

    // Compara apenas dia com horario default 00:00:00
    const resetTime = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())

    const diffDays = Math.floor( //Aredonda data
        (resetTime(dV).getTime() - resetTime(hoje).getTime()) / (1000 * 60 * 60 * 24) //get time pega o valores em milesssegundos desde 1970  e divido por 1 dia em milessegundos
    );

    if (diffDays < 0) {
        return (
            <Badge colorPalette={"red"} gap={2}>
                <MdOutlineAlarmOff />

                Produto Vencido
            </Badge>
        )
    } else if (diffDays <= 10) {
        return (
            <Badge colorPalette={"yellow"} gap={2}>
                <MdInfoOutline />
                Faltam {diffDays} dia(s) para vencer
            </Badge>
        )
    } else {
        return (
            <HStack>
                <TableText>{dV.toLocaleDateString()}</TableText>
            </HStack>
        )
    }

}
