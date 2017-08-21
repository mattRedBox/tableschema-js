const lodash = require('lodash')
const {ERROR} = require('../config')


// Module API

function castNumber(format, value, options={}) {
  const decimalChar = options.decimalChar || _DEFAULT_DECIMAL_CHAR
  const groupChar = options.groupChar || _DEFAULT_GROUP_CHAR
  if (!lodash.isNumber(value)) {
    if (!lodash.isString(value)) return ERROR
    if (!value.length) return ERROR
    value = value.replace(new RegExp('\\s', 'g'), '')
    value = value.replace(new RegExp(`[${decimalChar}]`, 'g'), '.')
    value = value.replace(new RegExp(`[${groupChar}]`, 'g'), '')
    if (options.bareNumber === false) {
      value = value.replace(new RegExp('((^\\D*)|(\\D*$))', 'g'), '')
    }
    try {
      value = lodash.toNumber(value)
    } catch (error) {
      return ERROR
    }
  }
  if (lodash.isNaN(value)) {
    return ERROR
  }
  return value
}


module.exports = {
  castNumber,
}


// Internal

const _DEFAULT_DECIMAL_CHAR = '.'
const _DEFAULT_GROUP_CHAR = ''
