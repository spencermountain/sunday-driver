let test = require('tape')
const SundayDriver = require('../src/index')

test('middle-splitter', function(t) {
  let arr = []
  let options = {
    file: __dirname + '/docs/numbers.txt',
    splitter: "250000\n"
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
    t.equal(arr.length, 2, 'got-two-chunks')
    t.end()
  })
})

test('fifths-splitter', function(t) {
  let arr = []
  let options = {
    file: __dirname + '/docs/numbers.txt',
    splitter: "100000\n"
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
    t.equal(arr.length, 5, 'got-five-chunks')
    t.end()
  })
})
