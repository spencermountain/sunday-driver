const fs = require('fs')

const getByte = function(str, total) {
  let percent = parseFloat(str.replace('%', ''))
  return total * (percent / 100)
}

//user-defined logging points
const setPoints = function(options) {
  let totalBytes = options.endByte - options.startByte
  let obj = options.atPercent || {}
  let points = Object.keys(obj).map(n => parseInt(n, 10))
  points = points.sort((a, b) => {
    if (a > b) {
      return 1
    }
    return -1
  })
  points = points.map((percent) => {
    return {
      fn: obj[percent],
      byte: totalBytes * (percent / 100)
    }
  })
  return points
}

//time-based interval logging
const setIntervals = function(options) {
  let obj = options.atInterval || {}
  let intervals = Object.keys(obj).map(k => {
    let min = k.replace(/ ?mins?$/, '')
    min = parseInt(min, 10)
    let seconds = min * 60
    return setInterval(options.atInterval[k], seconds * 1000)
  })
  return intervals
}

//find the specific byte to begin the file on
const startEnd = function(options) {
  const stats = fs.statSync(options.file)
  options.filesize = stats.size
  if (options.filesize === 0) {
    return options
  }
  if (options.start) {
    if (typeof options.start === 'string') {
      options.startByte = getByte(options.start, options.filesize)
    } else {
      options.startByte = options.start
    }
  }
  if (options.end) {
    if (typeof options.end === 'string') {
      options.endByte = getByte(options.end, options.filesize)
    } else {
      options.endByte = options.end
    }
  }
  //logger points
  options.logPoints = setPoints(options)
  options.intervals = setIntervals(options)
  return options
}
module.exports = startEnd
