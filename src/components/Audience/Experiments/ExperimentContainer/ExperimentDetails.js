import React, { Component } from 'react'
import { connect } from 'react-redux'
import SectionInput from '../../../Shared/SectionInput'
import SegmentsSelect from '../../Segments/SegmentsSelect'
import DistributeEvenly from '../Shared/DistributeEvenly'

class ExperimentDetails extends Component {

  renderDate(date) {
    return date ? new Date(date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }) : ''
  }

  renderSegment(segment) {
    const segmentInfo = this.props.segments.find(s => s.segment_assignment_id === segment.segment_assignment_id)
    return (
      <div key={`experiment-details-${this.props.experiment.experiment_id}-segment-${segment.segment_assignment_id}`} className="row mb-1">
        <div className="col-6">
          {segmentInfo.segment_description}
        </div>
        <div className="col-6">
          {segment.condition ? 'Included' : 'Excluded'}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="row">
        <div className="col-6">
          <div className="mb-5">
            <SectionInput
              readonly
              label="Experiment ID"
              type="text"
              value={this.props.experiment.experiment_id}
            />
            <SectionInput
              label="Name"
              readonly={!this.props.writeAccess}
              type="text"
              value={this.props.experiment.experiment_name}
              onChange={(event) => this.props.onUpdateExperiment('experiment_name', event.target.value)}
            />
            <SectionInput
              label="Description"
              readonly={!this.props.writeAccess}
              type="textarea"
              value={this.props.experiment.experiment_desc}
              onChange={(event) => this.props.onUpdateExperiment('experiment_desc', event.target.value)}
            />
            <SectionInput
              error={this.props.slugError && 'Slug already in use'}
              label="Slug"
              readonly={!this.props.writeAccess}
              type="text"
              value={this.props.experiment.experiment_slug}
              onChange={(event) => this.props.onUpdateExperiment('experiment_slug', event.target.value)}
            />
            <SectionInput
              label="Start Date"
              readonly={!this.props.writeAccess}
              type="date"
              value={this.renderDate(this.props.experiment.experiment_start_dt)}
              onChange={(value) => this.props.onUpdateExperiment('experiment_start_dt', value)}
            />
            <SectionInput
              label="End Date"
              readonly={!this.props.writeAccess}
              type="date"
              value={this.renderDate(this.props.experiment.experiment_end_dt)}
              onChange={(value) => this.props.onUpdateExperiment('experiment_end_dt', value)}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="row form-group">
            <div className="col-4 text-right">
              <label className="font-weight-bold mr-2">Segments</label>
            </div>
            <div className="col">
              {this.props.extraSegments && this.props.extraSegments.map(segment => this.renderSegment(segment))}
              {this.props.extraSegments && <hr />}
              {!this.props.writeAccess ? (
                this.props.experiment.experiment_segments_attributes.map(segment => this.renderSegment(segment))
              ) : (
                <SegmentsSelect
                  name={`experiment-${this.props.experiment.experiment_id}`}
                  segmentsAttributes={this.props.experiment.experiment_segments_attributes}
                  writeAccess={this.props.writeAccess}
                  onUpdateSegments={this.props.onUpdateSegments}
                />
              )}
            </div>
          </div>
          {this.props.writeAccess && (
            <DistributeEvenly
              distributeEvenly={this.props.distributeEvenly}
              experiment={this.props.experiment}
              experiments={this.props.experiments}
              onToggleDistributeEvenly={this.props.onToggleDistributeEvenly}
            />
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    segments: state.segments.info,
  }
}

export default connect(mapStateToProps)(ExperimentDetails)
