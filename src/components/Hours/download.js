import React from 'react'
import ReactExport from 'react-data-export'
import moment from 'moment'
const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

export default function download({ data }) {
  return (
    <ExcelFile element={<button className="download-btn">Download Data</button>}>
      <ExcelSheet data={data} name="Shifts">
        <ExcelColumn label="First Name" value="first_name" />
        <ExcelColumn label="Last Name" value="last_name" />
        <ExcelColumn label="Agent" value="agent_id" />
        <ExcelColumn label="Office Code" value="office_code" />
        <ExcelColumn label="Location Name" value="location_name" />
        <ExcelColumn label="Date" value={(col) => moment(col.start_dt).format('LL')} />
        <ExcelColumn label="Start Time" value={(col) => moment(col.start_dt).format('h:mm:ss a')} />
        <ExcelColumn label="End Time" value={(col) => moment(col.end_dt).format('h:mm:ss a')} />
        <ExcelColumn label="Hours" value={(col) => {
          var duration = moment(col.end_dt).diff(moment(col.start_dt))
          return moment.utc(duration).format('h:mm')
        }
        } />
        <ExcelColumn label="Approved" value={(col) => col.approved_by_user_id ? 'True' : 'False'} />
        <ExcelColumn label="Auto Clock Out" value={(col) => col.system_generated ? 'True' : 'False'} />
      </ExcelSheet>
    </ExcelFile>
  )
}
