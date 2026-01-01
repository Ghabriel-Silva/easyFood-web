export function handleNumber(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value

    // troca vírgula por ponto
    value = value.replace(",", ".")

    // remove tudo que não for número ou ponto
    value = value.replace(/[^0-9.]/g, "")

    // permite apenas um ponto
    value = value.replace(/(\..*)\./g, "$1")

    /**
     * Regra:
     * - até 2 dígitos antes do ponto
     * - até 3 casas decimais
     */
    value = value.replace(/^(\d{0,2})(\.\d{0,3})?.*$/, (_, int, dec) => {
        return `${int}${dec ?? ""}`
    })

    return value
}
