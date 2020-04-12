export const myfilter = () => {
  const data = new Date()
  const spe = '-'
  const years = data.getFullYear()
  const months = data.getMonth() + 1
  const days = data.getDate()
  return years + spe + months + spe + days
}
