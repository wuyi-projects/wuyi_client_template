import XEUtils from 'xe-utils'

// 格式化性别
export function formatSex({ cellValue }) {
  return cellValue ? (cellValue === '1' ? '男' : '女') : ''
}
// 格式化下拉选项
export function formatSelect({ cellValue }, list) {
  const item = list.find(item => item.value === cellValue)
  return item ? item.label : ''
}
// 格式化日期，默认 yyyy-MM-dd HH:mm:ss
export function formatDate({ cellValue }, format) {
  return XEUtils.toDateString(cellValue, format || 'yyyy-MM-dd HH:mm:ss')
}
// 格式化日期，默认 yyyy-MM-dd
export function formatShortDate({ cellValue }, format) {
  return XEUtils.toDateString(cellValue, format || 'yyyy-MM-dd')
}
// 四舍五入金额，每隔3位逗号分隔，默认2位数
export function formatAmount({ cellValue }, digits = 2) {
  return XEUtils.commafy(XEUtils.toNumber(cellValue), { digits: digits })
}
// 格式化银行卡，默认每4位空格隔开
export function formatBankcard({ cellValue }) {
  return XEUtils.commafy(XEUtils.toString(cellValue), { spaceNumber: 4, separator: ' ' })
}
// 四舍五入,默认两位数
export function formatFixedNumber({ cellValue }, digits = 2) {
  return XEUtils.toFixed(XEUtils.round(cellValue, digits), digits)
}
// 向下舍入,默认两位数
export function formatCutNumber({ cellValue }, digits = 2) {
  return XEUtils.toFixed(XEUtils.floor(cellValue, digits), digits)
}
// 转换 moment 类型为字符串
export function toMomentString({ cellValue }, format) {
  return cellValue ? cellValue.format(format) : ''
}
