import React from 'react'
import Modal from '../Modal'
import moment from 'moment'
import startCase from 'lodash/startCase'
import Autocomplete from './Autocomplete'

export default ({ attachFile, assign, modal, setModal, detail, note, setNote, setUserId, postNote, updateCase, disposition, setDisposition, searchUser, users }) => {
  return (
    <Modal closeModal={() => setModal(false)} title="Case Detail" visible={modal}>
      <div className="d-flex mt-3">
        <div className="mr-5">
          <p className="mb-1"><b>Status:</b> {detail['case_status_name']}</p>
          <p className="mb-1"><b>Change Reason:</b> {detail['case_status_change_reason_desc']}</p>
          <p className="mb-1"><b>Created Date:</b> {moment(detail['case_created_dt']).format('lll')}</p>
          <p className="mb-1"><b>Ticket Type:</b> {detail['category_name']}</p>
          <p className="mb-1"><b>Case ID:</b> {detail['case_guid'] && detail['case_guid'].substring(0, 8)}</p>
          {
            detail['agent'] &&
            <div>
              <p className="mb-1"><b>Requestor Channel:</b> {detail['agent']['channel_code']}</p>
              <p className="mb-1"><b>Requestor Source Code:</b> {detail['agent']['source_code']}</p>
              <p className="mb-1"><b>Requestor Office:</b> {detail['agent']['office_code']}</p>
              <p className="mb-1"><b>Requestor Agent ID:</b> {detail['agent']['agent_id']}</p>
              <p className="mb-1"><b>Requestor Email:</b> {detail['agent']['email']}</p>
              <p className="mb-1"><b>Requestor&apos;s Name:</b> {detail['agent']['first_name']} {detail['agent']['last_name']}</p>
            </div>
          }
        </div>
        <div>
          { detail['payload'] && <p className="mb-0"><b>{detail['category_name']} Details:</b></p> }
          {
            detail['payload'] ?
              Object.keys(detail['payload']).map(key =>
                <p key={key} className="mb-0"><small><b>{startCase(key)}:</b> {detail['payload'][key]}</small></p>
              )
              :
              <p className="mb-1"><b>Case Description:</b> {detail['case_description']}</p>
          }
        </div>
      </div>

      <p className="mb-1 mt-3"><b>Assigned To:</b> {detail['assigned_to_user_name']}</p>

      <div className="p-0 mb-3 col-md-6">
        <input className="form-control mb-2" placeholder="Search User" type="text" onChange={e => searchUser(e.target.value)} />
        <div className="d-flex justify-content-between">
          <select className="custom-select w-100 mr-3" onChange={e => setUserId(e.target.value)}>
            {
              users.map((item, key) => <option key={key} value={item.user_id}>{item.email}</option>)
            }
          </select>
          <button className="btn btn-sm btn-primary rounded" type="button" onClick={assign}>Assign User</button>
        </div>
      </div>

      <p className="mb-1 mt-3"><b>Notes:</b></p>

      <div className="w-100 mb-1">
        {
          detail['notes'] &&
          detail['notes'].map((item, key) => {
            return (
              <div key={key} className="alert alert-secondary d-flex justify-content-between mb-1">
                <p className="m-0"><b>{item['first_name']} {item['last_name']}</b>: {item['note']}</p>
                <p className="m-0">{moment(item['note_dt']).format('lll')}</p>
              </div>
            )
          })
        }
        <Autocomplete value={note} onChange={e => setNote(e.target.value)} />
        <button className="btn btn-sm btn-primary rounded" type="button" onClick={postNote}>Add Note</button>
      </div>

      <p className="mb-1 mt-3"><b>Attachments:</b></p>
      <div className="w-100 mb-3">
        <input className="w-100 mb-2" id="file-input" type="file" />
        <button className="btn btn-sm btn-primary rounded" type="button" onClick={attachFile}>Add Attachment</button>
      </div>

      <div className="d-flex">
        <div className="col-md-6 pb-3 pl-0 pr-3">
          <div>
            <p className="mb-1 mt-3"><b>Working Disposition:</b></p>
            <select required className="custom-select w-100 mb-2" value={disposition} onChange={e => setDisposition(e.target.value)}>
              <option value="NO_REASON" />
              <option value="PENDING_INTERNAL_RESPONSE">Pending Internal Response</option>
              <option value="PENDING_PARTNER_RESPONSE">Pending Partner Response</option>
              <option value="PENDING_VENDOR_RESPONSE">Pending Vendor Response</option>
              <option value="BLOCKED">Blocked</option>
            </select>
            <div className="d-flex justify-content-between">
              { detail['case_status_name'] === 'Triage' ?
                <button className="btn btn-success rounded mr-3 btn-sm" type="button" onClick={() => updateCase('WORKING')}>Work Case</button>
                :
                <button className="btn btn-success rounded mr-3 btn-sm" type="button" onClick={() => updateCase('REOPEN')}>Update Disposition</button>
              }
            </div>
          </div>
        </div>
        <div className="col-md-6 pb-3 pl-3 pr-0">
          {
            (detail['case_status_name'] === 'Closed' || detail['case_status_name'] === 'Cancelled') ?
              <div> 
                <p className="mb-1 mt-3"><b>Reopen Disposition:</b></p>
                <select required className="custom-select w-100 mb-2" value={disposition} onChange={e => setDisposition(e.target.value)}>
                  <option value="NO_REASON" />
                  <option value="VALID_ISSUE">Valid Issue</option>
                  <option value="INVALID_ISSUE">Invalid Issue</option>
                  <option value="PASSED_TO_CORRECT_TEAM">Passed to Correct Team</option>
                  <option value="NO_ACTION_NEEDED">No Action Needed</option>
                </select>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-danger rounded mr-3 btn-sm" type="button" onClick={() => updateCase('REOPEN')}>Reopen Case</button>
                  <button className="btn btn-secondary rounded btn-sm" type="button" onClick={() => updateCase('CANCEL')}>Cancel Case</button>
                </div>
              </div>
              :
              <div>
                <p className="mb-1 mt-3"><b>Close Disposition:</b></p>
                <select required className="custom-select w-100 mb-2" value={disposition} onChange={e => setDisposition(e.target.value)}>
                  <option value="NO_REASON" />
                  <option value="VALID_ISSUE">Valid Issue</option>
                  <option value="INVALID_ISSUE">Invalid Issue</option>
                  <option value="PASSED_TO_CORRECT_TEAM">Passed to Correct Team</option>
                  <option value="NO_ACTION_NEEDED">No Action Needed</option>
                </select>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-danger rounded mr-3 btn-sm" type="button" onClick={() => updateCase('CLOSE')}>Close Case</button>
                  <button className="btn btn-secondary rounded btn-sm" type="button" onClick={() => updateCase('CANCEL')}>Cancel Case</button>
                </div>
              </div>
          }
        </div>
      </div>
    </Modal>
  )
}
