import React from 'react'
import Select from './Select'
import Range from './Range'

export default ({ rule, predicate, onChange }) => {
  
  const inputType = predicate && predicate.segment_predicate.input_type

  if (inputType === 'select') {
    return (<Select
      predicate={predicate}
      rule={rule}
      onChange={onChange}
    />)
  }

  if (inputType === 'range') {
    return (<Range 
      predicate={predicate}
      rule={rule}
      onChange={onChange}
    />)
  }

  return null
}
