export function getCompRunDuplicates(key){
  return function(dispatch) {
    dispatch({ type: 'COMP_RUN_DUPLICATES', key })
  }
}
