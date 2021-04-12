import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SectionCheckbox = ({ label, title, onChange, checked, readonly }) => {

  return (
    <div className="row form-group">
      <div className="col-4 text-right" title={title}>
        <label className="font-weight-bold mr-1 form-check-label">{label}</label>
        {title && <FontAwesomeIcon className="feather" icon="question-circle" />}
      </div>
      <div className="col">
        {readonly ? (
          checked ? 'yes' : 'no'
        ) : (
          <input checked={checked} type="checkbox" onChange={onChange} />
        )}
      </div>
    </div>
  )
}

export default SectionCheckbox
