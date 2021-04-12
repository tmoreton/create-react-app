import React from 'react'

const SegmentsContext = ({ loading, segments }) => {

  const renderSegments = () => {
    return (
      <div>
        {segments.map(segment => (
          <div key={`segment-${segment.segment_assignment_id}`} className="mb-2">
            {segment.segment_description}
          </div>
        ))}
      </div>
    )
  }


  return (
    <div className="card mb-3">
      <div className="card-header">
        <strong>Segments</strong>
      </div>
      <div className="card-body">
        {loading ? (<div>Loading Segments...</div>) : (renderSegments())}
      </div>
    </div>
  )
}

export default SegmentsContext
