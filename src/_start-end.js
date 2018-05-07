const fs = require('fs')

const getByte = function(str, total) {
  let percent = parseFloat(str.replace('%', ''))
  return total * (percent / 100)
}

//find the specific byte to begin the file on
const startEnd = function(options) {
  const stats = fs.statSync(options.file)
  const fileSize = stats.size
  if (fileSize === 0) {
    return options
  }
  if (options.start) {
    if (typeof options.start === 'string') {
      options.startByte = getByte(options.start, fileSize)
    } else {
      options.startByte = options.start
    }
  }
  if (options.end) {
    if (typeof options.end === 'string') {
      options.endByte = getByte(options.end, fileSize)
    } else {
      options.endByte = options.end
    }
  }
  console.log(options)
  return options
}
module.exports = startEnd
