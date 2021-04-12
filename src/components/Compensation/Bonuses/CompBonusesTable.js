import React from 'react'
import matchSorter from 'match-sorter'
import moment from 'moment'
import startCase from 'lodash/startCase'
import StandardTable from '../../Shared/StandardTable.js'

function columns() {
  const standardColumnNames = ['comp_run_schedule_code', 'bonus_type_code', 'bonus_rule_desc', 'is_active', 'bonus_amount']
  const standardColumns = standardColumnNames.map(column => {
    return {
      Header: startCase(column),
      id: column,
      accessor: (row) => {
        const value = row[column]
        return value !== null ? value.toString() : null
      },
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: [column] })
      ),
      filterAll: true,
    }
  })

  const dateColumnNames = ['bonus_rule_start_dt', 'bonus_rule_end_dt', 'rescission_end_dt', 'deactivated_dt']
  const dateColumns = dateColumnNames.map(column => {
    return {
      Header: startCase(column).slice(0, -1 * '_dt'.length) + ' Date',
      id: column,
      accessor: (row) => {
        const dt = row[column]
        return dt ? moment(dt).format('L') : null
      },
      sortMethod: (a, b) => {
        return new Date(b).getTime() - new Date(a).getTime()
      },
      filterable: false,
    }
  })

  return [...standardColumns, ...dateColumns]
}

export default ({ data, onSelect }) => (<StandardTable
  columns={columns()}
  data={data}
  keyField="comp_run_schedule_bonus_rule_id"
  onSelect={onSelect}
/>)
