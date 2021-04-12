import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import startCase from 'lodash/startCase'
import ReactTable from 'react-table'
import history from '../../history'
import Modal from '../Modal'
import CreateSchedule from './CreateSchedule'
import { bulkCreateSchedule } from '../../actions/bulkCreateSchedule'

class CreateScheduleModal extends Component {

  constructor(props) {
    super(props)
    this.handleCreateSchedule = this.handleCreateSchedule.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  handleCreateSchedule(locationsToSchedule, schedule) {
    this.props.bulkCreateSchedule(locationsToSchedule, schedule, this.props.weeksFilter)
    this.closeModal()
  }

  closeModal() {
    history.goBack()
  }

  setColumns() {
    const columns = []
    const keys = ['location_name', 'city', 'state_code']
    keys.forEach(column => {
      columns.push({
        Header: startCase(column),
        id: column,
        accessor: column,
        filterAll: true,
      })
    })
    return columns
  }

  render() {
    const columns = this.setColumns()

    return (
      <div>
        <Modal closeModal={this.closeModal} title="Create Schedule" visible={this.props.visible}>
          <ReactTable
            className="-striped -highlight"
            columns={columns}
            data={this.props.locationsToSchedule}
            minRows={1}
            style={{
              height: '250px',
            }}
          />
          <CreateSchedule
            locationsToSchedule={this.props.locationsToSchedule}
            saveSchedule={(locationsToSchedule, schedule) => this.handleCreateSchedule(locationsToSchedule, schedule)}
            schedule={{}}
          />
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    locations: state.locations.all,
    locationsToSchedule: state.locationsToSchedule.selection,
    weeksFilter: state.weeksFilter,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ bulkCreateSchedule }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateScheduleModal)
