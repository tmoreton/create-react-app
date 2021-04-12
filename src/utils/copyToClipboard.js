export default function copyToClipboard(string) {
  const el = window.document.createElement('textarea')
  el.value = string
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  window.document.body.appendChild(el)
  el.select()
  window.document.execCommand('copy')
  window.document.body.removeChild(el)
}
