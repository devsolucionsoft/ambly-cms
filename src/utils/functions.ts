export const thousandPoints = (number: any) => {
  if (number) {
    const exp = /(\d)(?=(\d{3})+(?!\d))/g
    const rep = "$1."
    return number.toString().replace(exp, rep)
  } else {
    return "00,0"
  }
}
