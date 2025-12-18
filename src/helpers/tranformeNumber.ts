export const transformeNumber = (value:unknown, originalValue:unknown) => {
    if (typeof originalValue === "string") {
        return Number(originalValue.replace(",", "."))
    }
    return value
}