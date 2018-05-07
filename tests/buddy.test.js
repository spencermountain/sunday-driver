let test = require('tape')
const getChunkCount = require('./fns').getChunkCount

test('gets-newline-chunks', function(t) {
  let options = {
    file: __dirname + '/docs/buddyHolly.txt',
    splitter: "\n\n" //"Woo-hoo",
  }
  getChunkCount(options, (count) => {
    t.equal(count, 5, 'got-all-chunks')
    t.end()
  })
})

test('never-match-splitter', function(t) {
  let options = {
    file: __dirname + '/docs/buddyHolly.txt',
    splitter: "foobar"
  }
  getChunkCount(options, (count) => {
    t.equal(count, 1, 'got-one-huge-chunks')
    t.end()
  })
})
