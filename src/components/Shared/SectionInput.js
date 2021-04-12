import React from 'react'
import Select from 'react-select'
import { DatePicker } from 'antd'
import moment from 'moment'

const SectionInput = ({ type, label, value, onChange, readonly, error, required, placeholder, options, rows }) => {

  let input
  if (type === 'textarea') {
    input = <textarea className="form-control form-control-sm" placeholder={placeholder} readOnly={readonly} rows={rows} value={value || ''} onChange={onChange} />
  } else if (type === 'date') {
    // DatePicker keeps the previously selected date displayed if value is set to an empty string.
    // This will explicitly pass down null as the value if a falsey value prop is given
    const props = {
      value: value ? moment(value) : null,
    }
    input = (
      <DatePicker
        className={'border rounded'}
        disabled={readonly}
        onChange={onChange}
        {...props}
      />
    )
  } else if (type === 'checkbox') {
    input = <input checked={value || ''} className={`${readonly && 'text-muted bg-muted'}`} readOnly={readonly} type="checkbox" onChange={onChange} />
  } else if (type === 'select') {
    input = 
      (<Select
        options={options}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />)
  } else {
    input = <input className={`form-control form-control-sm ${readonly && 'text-muted bg-muted'}`} placeholder={placeholder} readOnly={readonly} type={type} value={value || ''} onChange={onChange} />
  }

  const optionalText = required ? null : <small>(Optional)</small>

  return (
    <div className="row form-group">
      <div className="col-4 text-right">
        <label className="font-weight-bold mr-2">
          {label} {optionalText}
        </label>
      </div>
      <div className="col">
        {input}
        {error && <span className="text-danger">{error}</span>}
      </div>
    </div>
  )
}

export default SectionInput

SectionInput.defaultProps = {
  type: 'text',
  readonly: false,
  error: false,
  required: true,
  placeholder: '',
  rows: 2,
}
