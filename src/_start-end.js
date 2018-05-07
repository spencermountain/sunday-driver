const fs = require('fs')

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
  return options
}
module.exports = startEnd
