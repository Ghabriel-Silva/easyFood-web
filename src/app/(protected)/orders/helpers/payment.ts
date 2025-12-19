export  function getPaymentColor(payment: string) {
  switch (payment) {
    case "Dinheiro":
      return "green";

    case "Cartão":
      return "blue";

    case "Pix":
      return "purple";

    case "Outros":
      return "gray";

    default:
      return "black";
  }
}