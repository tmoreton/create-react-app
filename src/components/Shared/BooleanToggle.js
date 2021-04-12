import React from 'react'

const BooleanToggle = ({ falseLabel, trueLabel, value, onToggle, disabled }) => {
  return (
    <div className="btn-group btn-group-toggle w-100">
      <label className={`btn btn-info px-1 py-0 w-100 rounded-0 font-size-10 ${!value? 'active' : 'border-light bg-light text-muted'}`}>
        <input autoComplete="off" disabled={disabled} id="option1" name="options" type="radio" onChange={() => onToggle(false)} />
        {falseLabel}
      </label>
      <label className={`btn btn-info px-1 py-0 w-100 rounded-0 font-size-10 ${value? 'active' : 'border-light bg-light text-muted'}`}>
        <input autoComplete="off" disabled={disabled} id="option2" name="options" type="radio" onChange={() => onToggle(true)} />
        {trueLabel}
      </label>
    </div>
  )
}

export default BooleanToggle

BooleanToggle.defaultProps = {
  disabled: false,
}
