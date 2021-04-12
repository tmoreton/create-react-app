import range from 'lodash/range'

export default range(0, 105, 5).map(num => {
  let value
  switch (num) {
  case 100:
    value = '1.0'
    break
  case 0:
    value = '0.0'
    break
  default:
    value = `${(num * .01)}`.substring(0,4)
    break
  }
  return { label: `${num}%`, value }
})
