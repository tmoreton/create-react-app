import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

export default function OfficeSelect({ offices, selectedOffice, handleSelectOffice }) {
  const options = Object.keys(offices).map(officeCode => {
    return { value: officeCode, label: officeCode }
  })

  return (
    <Select
      options={options}
      value={selectedOffice}
      onChange={handleSelectOffice}
    />
  )
}
