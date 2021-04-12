import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'
import moment from 'moment'
import addNote from '../../actions/cases/addNote'
import addAttachment from '../../actions/cases/addAttachment'
import assignUser from '../../actions/cases/assignUser'
import transitionCase from '../../actions/cases/transitionCase'
import getCase from '../../actions/cases/getCase'
import CasesModal from './CasesModal'
import { useParams, useHistory } from 'react-router-dom'

export default () => {
  const dispatch = useDispatch()
  const [modal, updateModal] = useState(false)
  const [note, setNote] = useState('')
  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState('')
  const [disposition, setDisposition] = useState('NO_REASON')
  const cases = useSelector(state => state.cases.all)
  const detail = useSelector(state => state.cases.case)
  const all_users = useSelector(state => state.users.all)
  const user = useSelector(state => state.users.selected)
  const history = useHistory()
  const { case_guid } = useParams()
  const dt_types = ['case_created_dt', 'closed_dt', 'work_begins_dt', 'updated_at']
  const types = [
    {
      Header: 'Department',
      id: 'department_code',
    },
    {
      Header: 'Category',
      id: 'category_name',
    },
    {
      Header: 'Status',
      id: 'case_status_name',
    },
    {
      Header: 'Disposition',
      id: 'case_status_change_reason_desc',
    },
    {
      Header: 'Assigned To',
      id: 'assigned_to_user_name',
    },
    {
      Header: 'Created',
      id: 'case_created_dt',
    },
    {
      Header: 'Submitter\'s Name',
      id: 'full_name',
    },
    {
      Header: 'Submitter\'s Email',
      id: 'email',
    },
    {
      Header: 'Sales Channel',
      id: 'channel_name',
    },
    {
      Header: 'Partner (Source)',
      id: 'source_code',
    },
    {
      Header: 'Office',
      id: 'office_code',
    },
    {
      Header: 'Last Changed',
      id: 'updated_at',
    },
    {
      Header: 'Work Began',
      id: 'work_begins_dt',
    },
    {
      Header: 'Closed',
      id: 'closed_dt',
    },
  ]

  useEffect(() => {
    if (case_guid && all_users){
      showModal(case_guid)
    }
  }, [])

  const columns = types.map(type => {
    return {
      Header: type.Header,
      id: type.id,
      accessor: type.id,
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: [type.id] })
      ),
      filterAll: true,
      Cell: row => { 
        if (dt_types.includes(row.column.id)){
          return moment(row.original[row.column.id]).format('lll')
        } else {
          return row.original[row.column.id]
        }
      },
    }
  })

  const showModal = async (guid) => {
    dispatch(getCase(guid))
    setModal(true)
    const found = all_users.filter(u => {
      if (u.email){
        return true
      }
      return false
    })
    setUsers(found)
  }

  const dismissModal = () => {
    updateModal(false)
    history.push('/cases/')
  }

  const setItem = async (data) => {
    if (data){
      showModal(data.original['case_guid'])
      history.push(`/cases/${data.original['case_guid']}`)
    }
  }

  const postNote = () => {
    dispatch(addNote(detail['case_guid'], note))
    setNote('')
  }

  const attachFile = () => {
    const fileInput = document.getElementById('file-input')
    dispatch(addAttachment(detail['case_guid'], fileInput.files[0]))
  }

  const assign = () => {
    dispatch(assignUser(detail['case_guid'], userId))
  }

  const updateCase = async (event) => {
    dispatch(transitionCase(detail['case_guid'], event, disposition))
    setDisposition('NO_REASON')
  }

  const setModal = (input) => {
    updateModal(input)
    dispatch({ type: 'CLEAR_CASE', payload: {} })
  }

  const search = async (input) => {
    const found = all_users.filter(u => {
      if (u.email && u.email.includes(input)){
        return true
      }
      return false
    })
    setUsers(found)
  }

  return (
    <div className="col-md-12 mx-auto">
      <h2 className="text-center w-100">Cases</h2>
      <ReactTable
        filterable
        className="-striped -highlight mb-3"
        columns={columns}
        data={cases}
        defaultFiltered={[{ id: 'department_code', value: 'SALES_OPS' }]}
        defaultPageSize={15}
        getTdProps={(s,r,c) => {
          if (c.id !== '_selector') {
            return {
              onClick: () => setItem(r),
              style: {
                cursor: 'pointer',
              },
            }
          }
        }}
        keyField="case_guid"
      />
      {
        detail &&
        <CasesModal
          assign={assign}
          attachFile={attachFile}
          detail={detail}
          disposition={disposition}
          modal={modal}
          note={note}
          postNote={postNote}
          searchUser={search}
          setDisposition={setDisposition}
          setModal={dismissModal}
          setNote={setNote}
          setUserId={setUserId}
          updateCase={updateCase}
          user={user}
          users={users}
        />
      }
    </div>
  )
}
