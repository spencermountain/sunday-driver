const SundayDriver = require('../src/index')

//just count how many chunks we recieved
const getChunkCount = function(options, callback) {
  let count = 0
  options.each = (str, cb) => {
    count += 1
    cb()
  }
  new SundayDriver(options).then(() => {
    callback(count)
  })
}
module.exports = {
  getChunkCount: getChunkCount
}
