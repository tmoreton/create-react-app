import sortBy from 'lodash/sortBy'

export default ({ options, label, value, sort = null }) => {
  if (sort) {
    return sortBy(options, sort).map(option => {
      return {
        label: label(option),
        value: option[value],
      }
    })
  } else {
    return options.map(option => {
      return {
        label: label(option),
        value: option[value],
      }
    })
  }
}
