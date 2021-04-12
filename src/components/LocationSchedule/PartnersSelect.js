import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

export default function PartnersSelect({ sources, selectedSource, handleSelectSource }) {

  const options = Object.keys(sources).map(sourceCode => {
    return { value: sourceCode, label: sources[sourceCode].source_name }
  })

  return (
    <Select
      options={options}
      value={selectedSource}
      onChange={handleSelectSource}
    />
  )
}
