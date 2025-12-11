
import { useState } from "react";

type SelectStatusProps = {
    status: string,
    newStatus: (novoStatus: string) => void
}

const SelectStatus: React.FC<SelectStatusProps> = ({ status, newStatus }) => {

    const [currentStatus, setCurrentStatus] = useState(status);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentStatus(e.target.value)
        if (newStatus) {
            newStatus(e.target.value)
        }
    }

    return (
        <select value={currentStatus} onChange={handleChange} style={{ fontSize: "0.85rem", padding: "2px 6px" }}>
            <option value="Pendente">Pendente</option>
            <option value="Preparando" >Preparando</option>
            <option value="Completo" >Completo</option>
            <option value="Entregue" >Entregue</option>
            <option value="Cancelado" >Cancelado</option>
        </select>
    );
}

export default SelectStatus;