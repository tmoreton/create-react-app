import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import startCase from 'lodash/startCase'
import isEmpty from 'lodash/isEmpty'
import matchSorter from 'match-sorter'
import history from '../../../../history'
import getExperiments from '../../../../actions/experiments/getExperiments'
import { changeModule } from '../../../../actions/changeModule'
import ReactTable from 'react-table'

class ExperimentsContainer extends Component {

  componentDidMount() {
    this.props.getExperiments()
    this.props.changeModule('Experiments')
  }

  experiments() {
    return Object.values(this.props.experiments)
  }

  createExperiment = () => {
    history.push('/experiments/new')
  }

  handleExperimentSelect = (experiment) => {
    history.push(`/experiments/${experiment.experiment_id}`)
  }

  tableColumns() {
    const columns = []
    const columnsToHide = ['assignment_rules', 'experiment_type', 'experiment_type_id', 'control_variation_id', 'created_at', 'updated_at']

    Object.keys(this.experiments()[0]).forEach(column => {
      if (!columnsToHide.includes(column)) {
        columns.push({
          Header: startCase(column),
          id: column,
          accessor: column,
          filterMethod: (filter, rows) => (
            matchSorter(rows, filter.value, { keys: [column] })
          ),
          filterAll: true,
        })
      }
    })
    return columns
  }

  render() {
    return (
      <div className="container-fluid">
        <h4 className="my-3">Experiments</h4>
        {!isEmpty(this.props.experiments) && (
          <ReactTable
            filterable
            className="-striped -highlight mb-3"
            columns={this.tableColumns()}
            data={this.experiments()}
            getTdProps={(s,r,c) => {
              if (c.id !== '_selector') {
                return {
                  onClick: () => this.handleExperimentSelect(r.original),
                  style: {
                    cursor: 'pointer',
                  },
                }
              } else {
                return {}
              }
            }}
            keyField="campaign_id"
            style={{ height: '500px' }}
          />
        )}
        <button className="btn btn-primary" onClick={this.createExperiment}>Create Experiment</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    experiments: state.experiments.info,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeModule, getExperiments }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ExperimentsContainer)
