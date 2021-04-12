import React, { Component } from 'react'
import { connect } from 'react-redux'
import getSegments from '../../../../actions/segments/getSegments'
import Segment from './Segment'

class SegmentsSelect extends Component {

  componentDidMount() {
    this.props.getSegments()
  }

  segments() {
    const segmentIds = this.props.segmentsAttributes.map(s => s.segment_assignment_id)
    return this.props.segments.filter(segment => !segmentIds.includes(segment.segment_assignment_id))
  }

  segment(segmentAttribute) {
    const segment = this.props.segments.find(s => s.segment_assignment_id === segmentAttribute.segment_assignment_id)
    segment.condition = segmentAttribute.condition
    return segment
  }

  onUpdateSegments = (segments) => {
    segments = segments.map(segment => {
      return {
        segment_assignment_id: segment.segment_assignment_id,
        condition: segment.condition,
      }
    })
    this.props.onUpdateSegments(segments)
  }

  addSegment = () => {
    const newSegments = [...this.props.segmentsAttributes, { ...this.segments()[0], condition: true }]
    this.onUpdateSegments(newSegments, true)
  }

  onUpdateSegment = (updatedSegment, replacedSegmentAssignmentId, isNew) => {
    const segments = this.props.segmentsAttributes.map(segment => {
      if (segment.segment_assignment_id === updatedSegment.segment_assignment_id) {
        segment = this.props.segments.find(s => s.segment_assignment_id === replacedSegmentAssignmentId)
        segment.condition = updatedSegment.condition
      }
      return segment
    })
    this.onUpdateSegments(segments, isNew)

  }

  onUpdateSegmentValue = (segmentAssignmentId, value, isNew) => {
    const segments = this.props.segmentsAttributes.map(segment => {
      if (segment.segment_assignment_id === segmentAssignmentId) {
        segment.condition = value
      }
      return segment
    })
    this.onUpdateSegments(segments, isNew)
  }

  onDeleteSegment = (segmentAssignmentId, isNew) => {
    const segments = this.props.segmentsAttributes.filter(attr => attr.segment_assignment_id !== segmentAssignmentId)
    this.onUpdateSegments(segments, isNew)
  }

  render() {
    if (this.props.loading) return null
    return (
      <div>
        {this.props.segmentsAttributes.map(segmentAttribute => (
          <Segment
            key={`${this.props.name}-segmentAttribute-${segmentAttribute.segment_assignment_id}`}
            name={`${this.props.name}-segmentAttribute-${segmentAttribute.segment_assignment_id}`}
            segment={this.segment(segmentAttribute)}
            segments={this.segments().concat(this.segment(segmentAttribute))}
            writeAccess={this.props.writeAccess}
            onDeleteSegment={this.onDeleteSegment}
            onUpdateSegment={this.onUpdateSegment}
            onUpdateSegmentValue={this.onUpdateSegmentValue}
          />
        ))}
        <div className="mt-3">
          {this.props.writeAccess && <button className="badge p-1" onClick={this.addSegment}>Add Segment</button>}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    segments: state.segments.info,
    loading: state.segments.loading,
  }
}

const mapDispatchToProps = {
  getSegments,
}

export default connect(mapStateToProps, mapDispatchToProps)(SegmentsSelect)
