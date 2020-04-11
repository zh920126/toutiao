export const myfilter = (data, spe) => {
  spe = spe || '-'
  const years = data.getFullYear()
  const months = data.getMonth() + 1
  const days = data.getDate()
  return years + spe + months + spe + days
}
