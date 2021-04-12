export default (arr, key) => {
  return arr && arr.length > 0 && Object.prototype.hasOwnProperty.call(arr[0], key) ? arr.map(input => input.value) : arr || []
}
