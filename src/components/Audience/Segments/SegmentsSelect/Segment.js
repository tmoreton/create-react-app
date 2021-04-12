import React, { Component } from 'react'

class Segment extends Component {

  onUpdateSegment = (event) => {
    this.props.onUpdateSegment(this.props.segment, parseInt(event.target.value, 10), this.props.isNew)
  }

  onUpdateSegmentValue = (event) => {
    const value = event.target.value === 'in' ? true : false
    this.props.onUpdateSegmentValue(this.props.segment.segment_assignment_id, value, this.props.isNew)
  }

  onDeleteSegment = () => {
    this.props.onDeleteSegment(this.props.segment.segment_assignment_id, this.props.isNew)
  }

  render() {
    return (
      <div className="mb-2 row align-items-center">
        <div className="col-6 d-flex align-items-center">
          <select className="form-control-md mr-2" defaultValue={this.props.segment.condition ? 'in' : 'not_in'} disabled={!this.props.writeAccess} onChange={this.onUpdateSegmentValue}>
            <option label="in" value="in" />
            <option label="not in" value="not_in" />
          </select>
          <select className="form-control-md mr-2" defaultValue={this.props.segment.segment_assignment_id} disabled={!this.props.writeAccess} onChange={this.onUpdateSegment}>
            {this.props.segments.map(segment => (
              <option key={`${this.props.name}-option-${segment.segment_assignment_id}`} label={segment.segment_description} value={segment.segment_assignment_id} />
            ))}
          </select>
        </div>
        <div className="col d-flex justify-content-end">
          {this.props.writeAccess && <a className="text-primary" onClick={this.onDeleteSegment}>Remove</a>}
        </div>
      </div>
    )
  }
}

export default Segment
