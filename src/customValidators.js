const nonNumeric = value => {
  if (typeof
  value === 'undefined' || value === null || value === ''
  ) {
    return true
  } else return !!value.match(/^[^!-@]*$/)
}

const nonNumericOneWord = value => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true
  } else return !!value.match(/^[^!-@\s]*$/)
}

const minDate = (value, minimalDate) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true
  } else return new Date(`'${value}'`) > new Date(minimalDate)
}

const maxDate = (value, amountOfTimeSinceNow) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true
  } else return new Date(`'${value}'`) < new Date(Date.now() - amountOfTimeSinceNow)
}

export { nonNumeric, nonNumericOneWord, minDate, maxDate }
