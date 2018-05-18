const fs = require('fs')
const setIntervals = require('./_intervals')
const setPoints = require('./_milestones')

const getByte = function(str, total) {
  let percent = parseFloat(str.replace('%', ''))
  return total * (percent / 100)
}

//find the specific byte to begin the file on
const startEnd = function(options) {
  const stats = fs.statSync(options.file)
  options.filesize = stats.size
  if (options.filesize === 0) {
    return options
  }
  if (typeof options.start === 'string') {
    options.startByte = getByte(options.start, options.filesize)
  } else {
    options.startByte = options.start || 0
  }
  if (typeof options.end === 'string') {
    options.endByte = getByte(options.end, options.filesize)
  } else {
    options.endByte = options.end || options.filesize
  }
  //logger points
  options.logPoints = setPoints(options)
  options.intervals = setIntervals(options)
  return options
}
module.exports = startEnd
