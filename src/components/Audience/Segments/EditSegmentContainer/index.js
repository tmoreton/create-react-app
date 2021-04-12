import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../../../../history'
import getPredicate from '../../../../actions/segments/getPredicate'
import Modal from '../../../Modal'
import CreateSegment from '../SegmentsContainer/CreateSegment'

class EditSegmentContainer extends Component {

  segment() {
    return this.props.segments.find(segment => segment.segment_assignment_id === parseInt(this.props.match.params.segmentId, 10))
  }

  closeModal = () => {
    history.goBack()
  }

  render() {
    return (
      <Modal closeModal={this.closeModal} title="Edit Segment" visible={true}>
        <CreateSegment segmentToEdit={this.segment()} onCloseCreateSegment={this.closeModal} />
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    segments: state.segments.info,
  }
}

const mapDispatchToProps = {
  getPredicate,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSegmentContainer)
