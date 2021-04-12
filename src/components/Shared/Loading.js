import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Loading = () => {
  return (
    <div className="mt-5n d-flex flex-column w-100 text-center align-items-center justify-content-center" style={{ height: '500px' }}>
      <div className="mb-3">
        <FontAwesomeIcon pulse color="#000" icon="spinner" size="2x" />
      </div>
      <h5 className="font-family-sans-serif"><i>Always be closing...</i></h5>
    </div>
  )
}

export default Loading
