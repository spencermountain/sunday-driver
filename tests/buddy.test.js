let test = require('tape')
const SundayDriver = require('../src/index')

test('gets-smallfile-chunks', function(t) {
  let arr = []
  let options = {
    file: __dirname + '/buddyHolly.txt',
    splitter: "\n\n" //"Woo-hoo",
  }
  let runner = new SundayDriver(options)
  runner.on('each', (str, cb) => {
    arr.push(str)
    cb()
  })
  runner.on('error', (err) => {
    console.log(err)
    t.fail(err)
  })
  runner.on('end', () => {
    t.equal(arr.length, 5, 'got-all-chunks')
    t.end()
  })
})
