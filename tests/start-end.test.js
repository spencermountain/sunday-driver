let test = require('tape')
const getChunkCount = require('./fns').getChunkCount

test('first-half', function(t) {
  let options = {
    file: __dirname + '/docs/500-k.txt',
    start: '0%',
    end: '48%',
    splitter: "0000\n"
  }
  getChunkCount(options, (count) => {
    t.equal(count, 25, 'half-of-fifty-chunks')
    t.end()
  })
})

test('middle-half', function(t) {
  let options = {
    file: __dirname + '/docs/500-k.txt',
    start: '25%',
    end: '75%',
    splitter: "0000\n"
  }
  getChunkCount(options, (count) => {
    t.equal(count, 25, 'half-of-fifty-chunks')
    t.end()
  })
})

test('last-half', function(t) {
  let options = {
    file: __dirname + '/docs/500-k.txt',
    start: '50%',
    end: '100%',
    splitter: "0000\n"
  }
  getChunkCount(options, (count) => {
    t.equal(count, 25, 'half-of-fifty-chunks')
    t.end()
  })
})
