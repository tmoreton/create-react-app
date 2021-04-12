import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Select from 'react-select'
import history from '../../history'
import Modal from '../Modal'
import FormattedDate from '../FormattedDate'
import FormattedTime from '../FormattedTime'
import AssignAgentsButtons from './AssignAgentsButtons'
import { getShift } from '../../actions/getShift'
import 'react-select/dist/react-select.css'

class AssignAgentsModal extends Component {

  constructor(props) {
    super(props)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.state = {
      assignedAgents: [],
      removeSelected: false,
    }
  }

  componentDidMount() {
    this.props.getShift(this.props.match.params.locationCode, this.props.match.params.shiftId)
  }

  componentDidUpdate(prevProps) {
    if (this.props.shift !== prevProps.shift) {
      const agents = this.props.shift.sales_agents.map(agent => {
        return {
          label: `${agent.first_name} ${agent.last_name}`,
          value: agent.sales_agent_id,
        }
      })
      this.setState({ assignedAgents: agents })
    }
  }

  closeModal() {
    history.goBack()
  }

  handleSelectChange(value) {
    this.setState({ assignedAgents: value })
  }

  render() {

    if (!this.props.shift) {
      return ''
    }

    const options = Object.keys(this.props.agents).map(agentId => {
      const agent = this.props.agents[agentId]
      return {
        label: `${agent.first_name} ${agent.last_name}`,
        value: agent.sales_agent_id,
      }
    })

    return (
      <Modal closeModal={this.closeModal} title={'Assign Agents'} visible={true}>
        <h3 className="text-center">
          {this.props.shift.location.location_name}
        </h3>
        <h4 className="text-center">
          <FormattedDate date={this.props.shift.start_dt} />
        </h4>
        <h5 className="text-center">
          <FormattedTime date={this.props.shift.start_dt} /> - <FormattedTime date={this.props.shift.end_dt} />
        </h5>
        <div className="row">
          <div className="col-4">
            <div className="my-3">
              <Select
                multi
                options={options}
                placeholder="Select agents"
                removeSelected={this.state.removeSelected}
                value={this.state.assignedAgents}
                onChange={this.handleSelectChange}
              />
            </div>
          </div>
        </div>
        <AssignAgentsButtons assignedAgents={this.state.assignedAgents} closeModal={this.closeModal} />
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    agents: state.salesAgents,
    shift: state.shift.info,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getShift }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignAgentsModal)
