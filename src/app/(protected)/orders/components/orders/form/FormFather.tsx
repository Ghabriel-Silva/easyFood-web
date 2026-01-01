import { InputField } from "./inputsOrders/InputField"


export const FormFather = () => {
    return (
        <>
            <InputField label="Nome" type="text" placeholder="ex: Gabriel silva" />
            <InputField label="Endereço" type="text" placeholder="ex: Ruas das Orquidias 22"  />
        </>
    )
}