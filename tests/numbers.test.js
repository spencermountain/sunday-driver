let test = require('tape')
const getChunkCount = require('./fns').getChunkCount

test('middle-splitter', function(t) {
  let options = {
    file: __dirname + '/docs/500-k.txt',
    splitter: "250000\n"
  }
  getChunkCount(options, (count) => {
    t.equal(count, 2, 'got-two-chunks')
    t.end()
  })
})

test('fifths-splitter', function(t) {
  let options = {
    file: __dirname + '/docs/500-k.txt',
    splitter: "00000\n"
  }
  getChunkCount(options, (count) => {
    t.equal(count, 5, 'got-five-chunks')
    t.end()
  })
})

test('fifty-splitter', function(t) {
  let options = {
    file: __dirname + '/docs/500-k.txt',
    splitter: "0000\n"
  }
  getChunkCount(options, (count) => {
    t.equal(count, 50, 'got-fifty-chunks')
    t.end()
  })
})
