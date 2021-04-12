import React, { Component } from 'react'
import { connect } from 'react-redux'
import getPredicates from '../../../../actions/segments/getPredicates'
import getPredicate from '../../../../actions/segments/getPredicate'
import createSegment from '../../../../actions/segments/createSegment'
import updateSegment from '../../../../actions/segments/updateSegment'
import SectionInput from '../../../Shared/SectionInput'
import SectionSelect from '../../../Shared/SectionSelect'
import RuleValueInput from './RuleValueInput'

class CreateSegment extends Component {

  state = {
    index: 0,
    segmentDescription: '',
    segmentRules: [],
  }

  componentDidMount() {
    this.props.getPredicates()
    if (this.props.segmentToEdit.segment_assignment_id) {
      this.setState({ segmentDescription: this.props.segmentToEdit.segment_description })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.segmentToEdit.segment_assignment_id && prevProps.predicates !== this.props.predicates) {
      const segmentRules = this.props.segmentToEdit.segment_rules_attributes
      this.setState({ segmentRules, index: segmentRules.length })
    }
  }

  onChangeSegmentDesc = (event) => {
    this.setState({ segmentDescription: event.target.value })
  }

  onAddRule = () => {
    this.setState({
      index: this.state.index + 1,
      segmentRules: [...this.state.segmentRules, { predicate: this.state.index, object: [] }],
    })
  }

  onChangeRulePredicate = (index, predicate) => {
    this.props.getPredicate(predicate)
    const newSegmentRules = this.state.segmentRules.slice(0)
    newSegmentRules[index] = { predicate, object: [] }
    this.setState({ segmentRules: newSegmentRules })
  }

  onChangeRuleValue = (index, rule) => {
    const newSegmentRules = this.state.segmentRules.slice(0)
    newSegmentRules[index] = rule
    this.setState({ segmentRules: newSegmentRules })
  }

  onCreateSegment = () => {
    if (this.props.segmentToEdit.segment_assignment_id) {
      this.props.updateSegment(this.props.segmentToEdit.segment_assignment_id, this.state.segmentDescription, this.state.segmentRules)
    } else {
      this.props.createSegment(this.state.segmentDescription, this.state.segmentRules)
    }
    this.setState({ segmentRules: [], segmentDescription: '' })
    this.props.onCloseCreateSegment()
  }

  onDeleteRule = (predicate, i) => {
    const newSegmentRules = this.state.segmentRules.slice(0)
    newSegmentRules[i]._delete = true
    this.setState({ segmentRules: newSegmentRules })
  }

  predicates() {
    return Object.values(this.props.predicates)
      .map(predicate => predicate.segment_predicate)
      .filter(predicate => predicate.display_in_rule_builder)
  }

  segmentRules() {
    return this.state.segmentRules.filter(r => !r._delete)
  }

  segmentRuleOptions(predicate) {
    if (!this.props.predicates[predicate]) return null
    return this.props.predicates[predicate].options
  }

  disableCreate() {
    return this.state.segmentRules.some(rule => rule.object.length === 0)
  }

  render() {
    return (
      <div className="mb-3">
        <div className="row mb-1">
          <div className="col-4">
            <SectionInput label="Segment Description" type="text" value={this.state.segmentDescription} onChange={this.onChangeSegmentDesc} />
          </div>
        </div>
        {this.segmentRules().map((segmentRule, i) => (
          <div key={`segmentRule-${segmentRule.predicate}`} className="row align-items-center mb-2">
            <div className="col-4">
              <SectionSelect
                label="Rule"
                labelKey="description"
                options={this.predicates()}
                type="text"
                value={segmentRule.predicate}
                valueKey="predicate"
                onChange={(event) => this.onChangeRulePredicate(i, event.target.value)}
              />
            </div>
            <div className="col-4">
              <RuleValueInput
                predicate={this.props.predicates[segmentRule.predicate]}
                rule={segmentRule}
                onChange={ (rule) => this.onChangeRuleValue(i, rule) }
              />
            </div>
            <div className="col-2">
              <a className="text-primary" onClick={() => this.onDeleteRule(segmentRule.predicate, i)}>Remove Rule</a>
            </div>
          </div>
        ))}
        <div className="row mb-3">
          <div className="col-4 text-right">
            <button className="badge p-1" onClick={this.onAddRule}>Add Rule</button>
          </div>
        </div>
        <div className="row">
          <div className="col-4 text-right">
            <a className="btn btn-primary text-white" disabled={this.disableCreate()} onClick={this.onCreateSegment}>Save</a>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    predicates: state.predicates.info,
  }
}

const mapDispatchToProps = {
  getPredicates,
  getPredicate,
  createSegment,
  updateSegment,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSegment)

CreateSegment.defaultProps = {
  segmentToEdit: {},
}
