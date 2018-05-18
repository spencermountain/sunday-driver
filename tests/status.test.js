let test = require('tape')
const SundayDriver = require('../src/index')

const doit = function(options, callback) {
  new SundayDriver(options).then((status) => {
    callback(status)
  })
}

test('0-100', function(t) {
  let options = {
    file: __dirname + '/docs/500-k.txt',
    start: '0%',
    end: '100%',
    splitter: "200",
  }
  doit(options, (status) => {
    t.equal(status.progress, 1, 'progress')
    t.equal(status.position, 1, 'position')
    t.equal(status.bytesDone, status.filesize, 'bytesDone')
    t.end()
  })
})

test('0-20', function(t) {
  let options = {
    file: __dirname + '/docs/500-k.txt',
    start: '0%',
    end: '20%',
    splitter: "200",
  }
  doit(options, (status) => {
    t.equal(status.progress, 1, 'progress')
    t.equal(status.position, 0.2, 'position')
    t.ok(status.bytesDone < status.filesize / 0.3, 'bytesDone')
    t.end()
  })
})

test('25-50', function(t) {
  let options = {
    file: __dirname + '/docs/500-k.txt',
    start: '25%',
    end: '50%',
    splitter: "200",
  }
  doit(options, (status) => {
    t.equal(status.progress, 1, 'progress')
    t.equal(status.position, 0.5, 'position')
    t.ok(status.bytesDone > status.filesize / 5, '> bytesDone')
    t.ok(status.bytesDone < status.filesize / 3, '< bytesDone')
    t.end()
  })
})
