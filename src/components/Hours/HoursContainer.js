import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import HoursRow from './HoursRow'
import { getShifts } from '../../actions/getShifts'
import { changeModule } from '../../actions/changeModule'
import Download from './download'
import moment from 'moment'
import orderBy from 'lodash/orderBy'
import lowerCase from 'lodash/lowerCase'
import { DatePicker } from 'antd'

class HoursContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hours: 'Unapproved',
      startDate: moment().subtract(30,'d'),
      endDate: moment(),
      admin: false,
    }
  }

  componentDidMount() {
    this.props.getShifts(this.props.match.params.sourceCode, lowerCase(this.state.hours))
    this.props.changeModule('Hours')
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.setState({ admin: this.props.user.roles.find((x) => x.name === 'SalesManager') !== undefined })
      this.props.getShifts(this.props.match.params.sourceCode, lowerCase(this.state.hours), this.state.startDate, this.state.endDate)
    }
  }

  changeHours = (event) => {
    const type = event.target.value
    this.setState({ hours: type })
    this.props.getShifts(this.props.match.params.sourceCode, lowerCase(type), this.state.startDate, this.state.endDate)
  }

  changeDate = (result) => {
    this.setState({
      startDate: result[0],
      endDate: result[1],
    })
    this.props.getShifts(this.props.match.params.sourceCode, lowerCase(this.state.hours), result[0], result[1])
  }

  render() {
    const { RangePicker } = DatePicker
    return (
      <div>
        <h2>{this.state.hours} Hours</h2>
        <h5>{this.props.match.params.sourceCode}</h5>
        <div className="container p-4">
          <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <select onChange={this.changeHours}>
              <option value="Unapproved">Unapproved Hours</option>
              <option value="Approved">Approved Hours</option>
              <option value="Unpaired">Unpaired Hours</option>
              { this.state.admin ? <option value="Scheduled">All Scheduled Hours</option> : null }
            </select>
            <RangePicker
              defaultValue={[this.state.startDate, this.state.endDate]}
              onChange={(result)=> this.changeDate(result)}
            />
            <Download data={this.props.shifts} />
          </div>
        </div>
        <table className="table" style={{ fontSize: 10 }}>
          <thead>
            <tr>
              <th>Source Code</th>
              <th>Name</th>
              <th>Agent ID</th>
              <th>Office Code</th>
              <th>Location Name</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Hours</th>
              <th>{ this.state.hours === 'Unapproved' || this.state.hours === 'Approved' ? 'Approved' : null }</th>
              <th>{ this.state.hours === 'Unapproved' || this.state.hours === 'Approved' ? 'Edit' : null }</th>
            </tr>
          </thead>
          <tbody>
            {orderBy(this.props.shifts, ['start_dt'],['desc']).map(shift => (
              <HoursRow
                key={shift.created_at}
                hours={this.state.hours}
                shift={shift}
              />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    shifts: state.shifts,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getShifts, changeModule }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HoursContainer)
