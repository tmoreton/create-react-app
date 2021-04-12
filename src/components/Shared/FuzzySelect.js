import React from 'react'
import Select from 'react-select'

// Wraps the react-select to use a better filter method, current one relies on indexOf which isn't great for searching large lists
// New custom search matches if all words in box are found anywhere in the option.label, case in-sensitive
const customFilterOption = (option, rawInput) => {
  const words = rawInput.split(' ')
  return words.reduce(
    (acc, cur) => acc && option.label.toLowerCase().includes(cur.toLowerCase()),
    true,
  )
}

const FuzzySelect = props => (
  <Select filterOption={customFilterOption} {...props} />
)

export default FuzzySelect
