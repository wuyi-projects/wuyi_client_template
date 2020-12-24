const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 时间 => 日期
const date2YearMonthDay = date => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = (date.getDate()).toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 时间 => 小时分钟
const date2HourMinute = date => {
  const h = date.getHours().toString().padStart(2, '0')
  const m = date.getMinutes().toString().padStart(2, '0')
  return `${h}:${m}`
}

function text2MonthDay(value) {
  if (!isNull(value)) {
    const timeArray = value.replace(' ', ':').replace(/\:/g, '-').split('-')
    const month = timeArray[1]
    const day = timeArray[2]
    return `${month}-${day}`
  }
  return ''
}

function text2DateText(value) {
  if (!isNull(value)) {
    const timeArray = value.replace(' ', ':').replace(/\:/g, '-').split('-')
    const hour = timeArray[3]
    return hour <= 12 ? '上午' : '下午'
  }
  return ''
}

function text2HourMinuteSecond(value) {
  if (!isNull(value)) {
    const timeArray = value.replace(' ', ':').replace(/\:/g, '-').split('-')
    const hour = timeArray[3]
    const minute = timeArray[4]
    const second = timeArray[5]
    return `${hour}:${minute}:${second}`
  }
  return ''
}

function text2HourMinute(value) {
  if (!isNull(value)) {
    const timeArray = value.replace(' ', ':').replace(/\:/g, '-').split('-')
    const hour = timeArray[3]
    const minute = timeArray[4]
    return `${hour}:${minute}`
  }
  return ''
}

function isNull(str) {
  if (Object.prototype.toString.call(str) === '[object Undefined]') { // 空
    return true
  } else if (
    Object.prototype.toString.call(str) === '[object String]' ||
    Object.prototype.toString.call(str) === '[object Array]') { // 字条串或数组
    return str.length === 0
  } else if (Object.prototype.toString.call(str) === '[object Object]') {
    return JSON.stringify(str) === '{}'
  } else if (typeof (str) === 'number') { // Number 型
    if (str) {
      return false
    } else { // 数字0 不算空
      if (str === 0) {
        return false
      }
      return true
    }
  } else if (typeof (str) === 'boolean') {
    if (!str) {
      return true
    } else {
      return false
    }
  } else {
    return true
  }
}

module.exports = {
  formatTime: formatTime,
  date2HourMinute: date2HourMinute,
  date2YearMonthDay: date2YearMonthDay,
  isNull: isNull,
  text2MonthDay: text2MonthDay,
  text2DateText: text2DateText,
  text2HourMinuteSecond: text2HourMinuteSecond,
  text2HourMinute: text2HourMinute
}
