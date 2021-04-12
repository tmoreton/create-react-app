import qs from 'qs'

export default (weeksFilter) => {
  const weeksFilterParams = {
    date_range_start: weeksFilter.startDt.format(),
    date_range_end: weeksFilter.endDt.format(),
    start_work_week: weeksFilter.startWorkWeek,
  }
  return qs.stringify(weeksFilterParams)
}
