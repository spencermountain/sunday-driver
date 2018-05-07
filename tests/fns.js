const SundayDriver = require('../src/index')

//just count how many chunks we recieved
const getChunkCount = function(options, callback) {
  let runner = new SundayDriver(options)
  let count = 0
  runner.on('each', (str, cb) => {
    count += 1
    cb()
  })
  runner.on('error', (err) => {
    console.log(err)
    callback(null)
  })
  runner.on('end', () => {
    callback(count)
  })
}
module.exports = {
  getChunkCount: getChunkCount
}
