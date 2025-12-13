
import { MdPending, MdAutorenew, MdCheckCircle, MdLocalShipping, MdCancel } from "react-icons/md";


export function getStatusOption(status: string) {
  switch (status) {
    case "Pendente":
      return { color: 'yellow', icon: <MdPending /> };
    case "Preparando":
      return { color: 'orange', icon: <MdAutorenew /> };
    case "Completo":
      return { color: "green", icon: <MdCheckCircle /> };
    case "Entregue":
      return { color: "blue", icon: <MdLocalShipping /> };
    case "Cancelado":
      return { color: "red", icon: <MdCancel /> };
    default:
      return { color: "gray", icon: <MdPending /> };
  }
}
