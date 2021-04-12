import React, { Component } from 'react'
import { connect } from 'react-redux'
import SectionInput from '../../../Shared/SectionInput'
import PlanSelect from '../../../Shared/PlanSelect'
import SegmentsSelect from '../../../Audience/Segments/SegmentsSelect'

class MarginAdjustmentDetails extends Component {

  marginAdjuster(margin) {
    return parseFloat(margin) * 100.0
  }


  marginAdjusterText() {
    const margin = this.props.marginAdjustment.adjustment
    const sum = this.marginAdjuster(margin) + 3
    let string = '3 '
    string += this.marginAdjuster(margin) >= 0 ? '+ ' : '- '
    string += `${Math.abs(this.marginAdjuster(margin))} = `
    string += `${sum} cents`
    return string
  }

  render() {
    return (
      <div className="row">
        <div className="col-6">
          <div className="mb-5">
            <SectionInput
              readonly
              label="Margin Adjustment ID"
              type="text"
              value={this.props.marginAdjustment.margin_adjustment_id}
            />
            <SectionInput
              label="Description"
              readonly={!this.props.writeAccess}
              type="textarea"
              value={this.props.marginAdjustment.description}
              onChange={(event) => this.props.onUpdateMarginAdjustment('description', event.target.value)}
            />
            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold mr-2">
                  Plan Code
                </label>
              </div>
              <div className="col">
                <PlanSelect
                  planCode={this.props.marginAdjustment.plan_code}
                  writeAccess={this.props.writeAccess}
                  onChange={(value) => this.props.onUpdateMarginAdjustment('plan_code', value)}
                />
              </div>
            </div>
            <SectionInput
              label="Margin Adjustment"
              readonly={!this.props.writeAccess}
              type="text"
              value={this.props.marginAdjustment.adjustment}
              onChange={(event) => this.props.onUpdateMarginAdjustment('adjustment', event.target.value)}
            />
            {this.props.marginAdjustment.adjustment && (
              <div className="row">
                <div className="col offset-4">
                  <small>* {this.marginAdjusterText()}</small>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-6">
          <div className="row form-group">
            <div className="col-4 text-right">
              <label className="font-weight-bold mr-2">Segments</label>
              <div>(Must match all)</div>
            </div>
            <div className="col">
              <SegmentsSelect
                name={`campaign-${this.props.marginAdjustment.margin_adjustment_id}`}
                segmentsAttributes={this.props.marginAdjustment.margin_adjustment_segments}
                writeAccess={this.props.writeAccess}
                onUpdateSegments={this.props.onUpdateSegments}
              />
            </div>
          </div>
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

export default connect(mapStateToProps)(MarginAdjustmentDetails)
