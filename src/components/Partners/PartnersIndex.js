import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import pickBy from 'lodash/pickBy'
import sortBy from 'lodash/sortBy'
import history from '../../history'
import { changeModule } from '../../actions/changeModule'
import { getSources } from '../../actions/getSources'
import { getSource } from '../../actions/getSource'
import { getSalesAgents } from '../../actions/getSalesAgents'
import { getShifts } from '../../actions/getShifts'

class PartnersIndex extends Component {

  constructor(props) {
    super(props)
    this.handleViewSchedule = this.handleViewSchedule.bind(this)
    this.handleViewHistory = this.handleViewHistory.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleViewHours = this.handleViewHours.bind(this)
    this.state = {
      filtered: this.props.sources,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.sources !== prevProps.sources) {
      this.setState({ filtered: this.props.sources })
    }
  }

  handleViewSchedule(sourceCode) {
    this.props.getSource(sourceCode)
    this.props.getSalesAgents(sourceCode)
    history.push(`/partners/${sourceCode}/schedules`)
  }

  handleViewHistory(sourceCode) {
    this.props.getSource(sourceCode)
    history.push(`/partners/${sourceCode}/schedule_history`)
  }

  handleViewHours(sourceCode) {
    this.props.getShifts(sourceCode)
    this.props.getSource(sourceCode)
    history.push(`/hours/${sourceCode}`)
  }

  handleChange(event) {
    const isMatch = (source) => source.source_name.match(new RegExp(event.target.value, 'i'))
    this.setState({ filtered: pickBy(this.props.sources, (source) => isMatch(source)) })
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            <div className="mb-3">
              <input autoFocus className="form-control" placeholder="Search a partner" type="text" onChange={this.handleChange} />
            </div>
          </div>
        </div>
        <table className="table table-striped">
          <tbody>
            {sortBy(Object.keys(this.state.filtered)).map(sourceCode => (
              <tr key={sourceCode}>
                <td>{this.props.sources[sourceCode].source_name}</td>
                <td>{this.props.sources[sourceCode].source_phone_number}</td>
                <td>
                  <a className="text-primary" onClick={() => this.handleViewSchedule(sourceCode)}>View Schedule</a>
                </td>
                <td>
                  <a className="text-primary" onClick={() => this.handleViewHistory(sourceCode)}>View History</a>
                </td>
                <td>
                  <a className="text-primary" onClick={() => this.handleViewHours(sourceCode)}>View Hours</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    sources: state.sources.all,
    weeksFilter: state.weeksFilter,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getShifts, getSources, getSource, getSalesAgents, changeModule }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PartnersIndex)
