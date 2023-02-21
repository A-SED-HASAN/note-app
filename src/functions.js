export const plusFontSize = () => {
  if (document.documentElement.classList.contains('font-size-minus')) {
    document.documentElement.classList.remove('font-size-minus')
    document.documentElement.classList.add('font-size-plus')
  }
  document.documentElement.classList.add('font-size-plus')
}
export const normalFontSize = () => {
  if (document.documentElement.classList.contains('font-size-plus')) {
    document.documentElement.classList.remove('font-size-plus')
  }
}
export const getNotes = () => {
  let list = localStorage.getItem('list')
  if (list) {
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
}
export const getDeletedNotes = () => {
  let deletedNotes = localStorage.getItem('deletedNotes')
  if (deletedNotes) {
    return JSON.parse(localStorage.getItem('deletedNotes'))
  } else {
    return []
  }
}
export const msToTime = (s) => {
  var pad = (n, z = 2) => ('00' + n).slice(-z)
  return (
    pad((s / 3.6e6) | 0) +
    ':' +
    pad(((s % 3.6e6) / 6e4) | 0) +
    ':' +
    pad(((s % 6e4) / 1000) | 0)
  )
}
