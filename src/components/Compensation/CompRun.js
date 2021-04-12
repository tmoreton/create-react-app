import React from 'react'

export default function CompRun({ compRun, handleAuditClick }) {

  return (
    <div alt={JSON.stringify(compRun)}>
      <p className="mb-0">
        <b>Comp Run ID:</b> {compRun.comp_run_id}<br />
        <b>Comp Run Schedule Code:</b> {compRun.comp_run_schedule_code}<br />
        <b>Comp Run Payment Expected Date:</b> {compRun.comp_run_payment_expected_dt}<br />
        <b>Total Comp Amt:</b> {compRun.total_comp_amt}
      </p>
      <button className="btn btn-primary pt-0 pb-0 mt-0 mb-3" onClick={() => {handleAuditClick(compRun.comp_run_schedule_code, compRun.comp_run_id)}}>View Run</button>
    </div>
  )
}
