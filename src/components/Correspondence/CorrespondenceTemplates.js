import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import startCase from 'lodash/startCase'
import get from 'lodash/get'
import { changeModule } from '../../actions/changeModule'
import StandardTable from '../Shared/StandardTable.js'
import getCorrespondenceTemplates from '../../actions/correspondence/getCorrespondenceTemplates'
import history from '../../history'

class CorrespondenceTemplates extends Component {
  componentDidMount() {
    this.props.getCorrespondenceTemplates()
    this.props.changeModule('Templates')
  }

  onSelectCorrespondenceTemplate(correspondenceTemplate) {
    history.push('/correspondence_templates/' + correspondenceTemplate.correspondence_template_id)
  }

  columns() {
    const lastUpdatedByColumnName = 'latest_history.user.external_id'
    const lastUpdatedAtColumnName = 'latest_history.created_at'
    const filterableColumnNames = ['correspondence_type.correspondence_type_name', 'state_code', lastUpdatedByColumnName]
    const filterableColumns = filterableColumnNames.map(column => {
      const nestedParts = column.split('.')
      return {
        Header: startCase(nestedParts[nestedParts.length - 1]),
        id: column,
        accessor: (row) => {
          return get(row, column)
        },
        filterMethod: (filter, rows) => (
          rows.filter(row => get(row, column).toLowerCase().includes(filter.value.toLowerCase()))
        ),
        filterAll: true,
      }
    })

    const lastUpdatedAtColumn = {
      Header: 'Updated At',
      id: 'updated_at',
      accessor: (row) => {
        const date = moment(get(row, lastUpdatedAtColumnName))
        return `${date.format('M/D/YY')} ${date.format('h:mm a')}`
      },
      sortMethod: (a, b) => {
        return new Date(b).getTime() - new Date(a).getTime()
      },
      filterable: false,
    }

    filterableColumns[filterableColumnNames.indexOf(lastUpdatedByColumnName)]['Header'] = 'Last Updated By'

    return [...filterableColumns, lastUpdatedAtColumn]
  }

  data() {
    return this.props.correspondenceTemplates.filter(correspondenceTemplate => {
      return correspondenceTemplate.user_editable
    })
  }

  render() {
    if (this.props.loading) {
      return <div>Loading...</div>
    }

    return (<Fragment>
      <h1>Correspondence Templates</h1>
      <br />
      <StandardTable
        columns={this.columns()}
        data={this.data()}
        height="600px"
        keyField="correspondence_template_id"
        onSelect={this.onSelectCorrespondenceTemplate}
      />
    </Fragment>)
  }
}

function mapStateToProps({ correspondenceTemplates }) {
  return {
    loading: correspondenceTemplates.loading,
    correspondenceTemplates: correspondenceTemplates.correspondenceTemplates,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeModule, getCorrespondenceTemplates }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CorrespondenceTemplates)
