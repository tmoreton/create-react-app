import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { changeModule } from '../../actions/changeModule'
import getCases from '../../actions/cases/getCases'
import getAllUsers from '../../actions/Users/getAllUsers'
import CasesContainer from './CasesContainer'

export default () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changeModule('Cases'))
    dispatch(getCases())
    dispatch(getAllUsers())
  }, [])

  return (
    <div className="container-fluid">
      <CasesContainer />
    </div>
  )
}
