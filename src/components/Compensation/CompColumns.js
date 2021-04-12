import history from '../../history'

const handleAuditClick = (code, id) => {
  history.push(`/compensation/schedules/${code}/runs/${id}`)
}

const handleRulesClick = (code) => {
  history.push(`/compensation/schedules/${code}/rules`)
}

const handleAllRunsClick = (code) => {
  history.push(`/compensation/schedules/${code}/runs`)
}

const handleViewScheduleClick = (code) => {
  history.push(`/compensation/schedules/${code}`)
}

const handleEditScheduleClick = (code) => {
  history.push(`/compensation/schedules/${code}/edit`)
}

export const getCompColumns = () => {
  return [
    {
      Header: 'Name',
      id: 'source_code',
    },
    {
      Header: 'Pay Period',
      id: 'pay_period_end_type',
    },
    {
      Header: 'Day of Week',
      id: 'first_day_of_week',
    },
    {
      Header: 'Rescission Period (Days)',
      id: 'days_to_rescind',
    },
    {
      Header: 'Clawback Period (Days)',
      id: 'days_to_clawback',
    },
    {
      Header: 'Clawback Days From',
      id: 'clawback_from_dt_field',
    },
    {
      Header: 'Active?',
      id: 'is_active',
    },
    {
      Header: 'Schedule',
      id: 'Edit',
      func: handleEditScheduleClick,
    },
    {
      Header: 'Latest Run',
      id: 'View',
      func: handleAuditClick,
    },
    {
      Header: 'All Runs',
      id: 'View',
      func: handleAllRunsClick,
    },
    {
      Header: 'Schedule',
      id: 'View',
      func: handleViewScheduleClick,
    },
    {
      Header: 'Rules',
      id: 'View',
      func: handleRulesClick,
    },
  ]
}
