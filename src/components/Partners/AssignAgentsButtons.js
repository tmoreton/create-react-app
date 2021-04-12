import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { assignAgents } from '../../actions/assignAgents'

class AssignAgentsButtons extends Component {

  constructor(props) {
    super(props)
    this.assignAgents = this.assignAgents.bind(this)
    this.state = {
      assignmentResult: { success: false, message: '' },
      assigning: false,
    }
  }

  componentWillUnmount() {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle)
    }
  }

  assignAgents() {
    const agentIds = this.props.assignedAgents.map(agent => agent.value)
    this.setState({ assigning: true })
    this.props.assignAgents(this.props.shift, agentIds, this.props.user.userId, this.props.weeks, this.assigningCallback())
  }

  assigningCallback() {
    return (success, message) => {
      this.setState({ assigning: false, assignmentResult: { show: true, success, message } })
      this.timerHandle = setTimeout(() => {
        this.setState({ assignmentResult: { show: false } })
      }, 2000)
    }
  }

  assignmentResultClass() {
    return this.state.assignmentResult.success ? 'text-success' : 'text-error'
  }

  render() {

    let assignmentResult
    if (this.state.assignmentResult.show) {
      assignmentResult = <span className={this.assignmentResultClass()}>{this.state.assignmentResult.message}</span>
    } else {
      assignmentResult = ''
    }

    return (
      <div>
        <button className="btn btn-primary" disabled={this.state.assigning} onClick={this.assignAgents}>
          Save
        </button>
        <button className="ml-2 btn btn-muted-outline" onClick={this.props.closeModal}>
          Cancel
        </button>
        <div className="my-2">
          {assignmentResult}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    shift: state.shift.info,
    weeks: state.weeksFilter,
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ assignAgents }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignAgentsButtons)
