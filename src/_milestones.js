
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

module.exports = setPoints
