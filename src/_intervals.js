
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
module.exports = setIntervals
