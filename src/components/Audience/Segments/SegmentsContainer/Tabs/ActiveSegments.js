import React, { Component } from 'react'
import history from '../../../../../history'
import CreateSegment from '../CreateSegment'

class ActiveSegments extends Component {

  state = {
    showCreateSegment: false,
  }

  componentDidMount() {
    history.replace('/segments/active')
  }

  onToggleCreateSegment = () => {
    this.setState({ showCreateSegment: !this.state.showCreateSegment })
  }

  onEditSegment = (segmentToEdit) => {
    history.push(`/segments/active/${segmentToEdit.segment_assignment_id}/edit`)
  }

  displayRuleType = (segmentRule) => {
    switch (segmentRule.rule_type) {
    case 'greater':
      return '> '
    case 'less':
      return '< '
    default:
      return ''
    }
  }

  render() {
    return (
      <div>
        {this.props.writeAccess && (
          <div className="card mb-3">
            <div className="card-header">
              <div className="row">
                <div className="col-6">
                  <strong>New Segment</strong>
                </div>
                <div className="col-6 text-right">
                  <a className="text-primary" onClick={this.onToggleCreateSegment}>{this.state.showCreateSegment ? 'Close' : 'Create New Segment'}</a>
                </div>
              </div>
            </div>
            {this.state.showCreateSegment && (
              <div className="card-body">
                <CreateSegment onCloseCreateSegment={this.onToggleCreateSegment} />
              </div>
            )}
          </div>
        )}
        <div>
          {this.props.segments.map((segment, i) => (
            <div key={`segment-${segment.segment_assignment_id}`} className={`row py-3 align-items-center ${(i % 2 === 0) ? 'bg-muted' : ''}`}>
              <div className="col-2">
                <h5>{segment.segment_description}</h5>
              </div>
              <div className="col-9">
                <table>
                  <thead>
                    <tr>
                      {segment.segment_rules_attributes.map(segmentRule => (
                        <th key={`segment_assignment_id-${segmentRule.segment_rule_id}-header`} className="pr-3">
                          {segmentRule.predicate}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {segment.segment_rules_attributes.map(segmentRule => (
                        <td key={`segment-${segment.segment_assignment_id}-${segmentRule.segment_rule_id}`} className="pr-3">
                          {segmentRule.object.map(obj => (
                            <div key={`segment_assignment_id-${segment.segment_assignment_id}-${segmentRule.segment_rule_id}-${obj}`}>{this.displayRuleType(segmentRule) }{obj}</div>
                          ))}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              {this.props.writeAccess && (
                <div className="col-1">
                  <a className="text-info" onClick={() => this.onEditSegment(segment)}>Edit</a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default ActiveSegments
