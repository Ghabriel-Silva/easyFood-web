export function calculoPercentualAdicional(valorTotal: string, adicional: string): number {
  const totalVa: number = parseFloat(valorTotal)
  const totalAdd: number = parseFloat(adicional)


  const valorOriginal: number = totalVa - totalAdd
  const percentual = (totalAdd / valorOriginal) * 100

  return parseFloat(percentual.toFixed(2))
}

export function calculoPercentualDescon(valorTotal: string,  desconto: string): number {
  const totalVa: number = parseFloat(valorTotal)
  const totalDesc: number = parseFloat(desconto)

  const valorOriginal: number = totalVa - totalDesc
  const percentual = (totalDesc / valorOriginal) * 100

  return parseFloat(percentual.toFixed(2))
}