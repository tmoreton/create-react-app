import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCompRules } from '../../actions/Compensation/getCompRules'
import CompRule from './CompRule'

class CompRunScheduleContainer extends Component {
  componentDidMount() {
    if (this.props.match.params.compRunScheduleCode) {
      this.props.getCompRules(this.props.match.params.compRunScheduleCode)
    }
  }

  render() {
    return (
      <div>
        <h1>COMPENSATION SCHEDULE FOR {this.props.match.params.compRunScheduleCode}</h1>
        {(this.props.compRules || []).map((compRule, index) => (
          <div key={index}>
            <CompRule compRule={compRule} />
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    compRules: state.compRules,
  }
}

const mapDispatchToProps = {
  getCompRules,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompRunScheduleContainer)
