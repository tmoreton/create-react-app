import React from 'react'
import Select, { Creatable } from 'react-select'

const SectionSelect = ({ label, readonly, value, options, labelKey, valueKey, onChange, defaultLabel, multi, children, allowCreate, required }) => {
  const TagName = allowCreate ? Creatable : Select
  const optionalText = required ? null : <small>(Optional)</small>

  return (
    <div className="row form-group align-items-center">
      <div className="col-4 text-right">
        <label className="font-weight-bold mr-2 mb-0">
          {label} {optionalText}
        </label>
      </div>
      {multi ? (
        <div className="col">
          <TagName
            multi
            options={options.map(option => {
              option.value = option[valueKey]
              option.label = option[labelKey]
              return option
            })}
            value={value}
            onChange={onChange}
          />
        </div>
      ) : (
        <div className="col">
          <select className="form-control form-control-md w-100" disabled={readonly} value={value || ''} onChange={onChange}>
            <option label={defaultLabel} value="" />
            {options.map(option => (
              <option key={valueKey ? option[valueKey] : option} label={labelKey ? option[labelKey] : option} value={valueKey ? option[valueKey] : option} />
            ))}
          </select>
        </div>
      )}
      {children && (
        <div className="col-2">
          {children}
        </div>
      )}
    </div>
  )
}

export default SectionSelect

SectionSelect.defaultProps = {
  multi: false,
  readonly: false,
  hideLabel: false,
  defaultLabel: ' ',
  allowCreate: false,
  required: true,
}
