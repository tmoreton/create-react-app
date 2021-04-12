import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DatePicker } from 'antd'
import Select from 'react-select'

class AdjustWeeks extends Component {

  render() {

    const { RangePicker } = DatePicker

    const options = [{ value: 'sunday', label: 'Sunday' }, { value: 'monday', label: 'Monday' }]

    return (
      <div className="row align-items-center">
        <div className="col-lg-5">
          <div>Start work week:</div>
          <Select
            options={options}
            value={this.props.weeksFilter.startWorkWeek}
            onChange={this.props.handleStartDayChange}
          />
        </div>
        <div className="col-lg-7">
          <div>Date range:</div>
          <RangePicker
            defaultValue={[this.props.weeksFilter.startDt, this.props.weeksFilter.endDt]}
            onChange={this.props.handleRangePickerChange}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    weeksFilter: state.weeksFilter,
  }
}

export default connect(mapStateToProps)(AdjustWeeks)
