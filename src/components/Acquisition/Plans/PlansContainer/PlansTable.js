import React from 'react'
import ReactTable from 'react-table'
import isEmpty from 'lodash/isEmpty'
import sortBy from 'lodash/sortBy'
import startCase from 'lodash/startCase'
import history from '../../../../history'

const COLUMNS = [
  'plan_code',
  'plan_name',
  'isActive',
  'contract_type_code',
  'contract_duration',
]

const PlansTable = ({
  tab,
  loadingPlans,
  plans,
  deactivateAllPlans,
}) => {

  if (isEmpty(plans) && !loadingPlans) {
    return <h5 className="mb-4">No plans found</h5>
  }

  if (isEmpty(plans) || loadingPlans) {
    return <h5 className="mb-4">Loading {tab} plans...</h5>
  }

  const header = (column) => {
    if (column === 'is_active') {
      return 'Active'
    } else if (column === 'contract_type_code') {
      return 'Structure'
    } else if (column === 'contract_duration') {
      return 'Term Length'
    } else {
      return startCase(column)
    }
  }

  const tableColumns = () => {
    const columns = []
    const sortedColumns = sortBy(Object.keys(plans[0]), (element) => {
      const rank = {
        plan_code : 1,
        plan_name: 2,
        contract_type_code: 3,
        contract_duration: 4,
        is_default: 5,
        isActive: 6,
      }
      return rank[element]
    })
    sortedColumns.forEach(column => {
      if (COLUMNS.includes(column)) {
        const tableColumn = {
          Header: header(column),
          id: column,
          accessor: column,
          filterAll: true,
        }
        columns.push(tableColumn)
      }
    })
    return columns
  }

  const handleSectionSelect = (plan) => {
    history.push(`/plans/${plan.plan_code}`)
  }

  const style = { height: '500px' }

  return (
    <div className="mb-4">
      <h5>Found {plans.length} plans.</h5>
      <ReactTable
        className="-striped -highlight mb-3"
        columns={tableColumns()}
        data={plans}
        defaultPageSize={100}
        getTdProps={(s,r,c) => {
          if (c.id === 'is_active') {
            return {
              style: {
                cursor: 'pointer',
              },
            }
          } else if (c.id !== '_selector') {
            return {
              onClick: () => handleSectionSelect(r.original),
              style: {
                cursor: 'pointer',
              },
            }
          } else {
            return {}
          }
        }}
        keyField="plan_code"
        style={style}
      />
      <button className="btn btn-danger" onClick={deactivateAllPlans}>Deactivate plans</button>
    </div>
  )
}

export default PlansTable
