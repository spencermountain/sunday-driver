let test = require('tape')
const SundayDriver = require('../src/index')

const doit = function(options, callback) {
  let driver = new SundayDriver(options)
  driver.on('each', (str, cb) => {
    cb()
  })
  driver.on('end', () => {
    callback(driver)
  })
}

test('0-100', function(t) {
  let options = {
    file: __dirname + '/docs/500-k.txt',
    start: '0%',
    end: '100%',
    splitter: "200",
  }
  doit(options, (driver) => {
    let status = driver.status()
    t.equal(status.progress, 1, 'progress')
    t.equal(status.position, 1, 'position')
    t.equal(status.bytesDone, driver.filesize, 'bytesDone')
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
  doit(options, (driver) => {
    let status = driver.status()
    t.equal(status.progress, 1, 'progress')
    t.equal(status.position, 0.2, 'position')
    t.ok(status.bytesDone < driver.filesize / 0.3, 'bytesDone')
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
  doit(options, (driver) => {
    let status = driver.status()
    t.equal(status.progress, 1, 'progress')
    t.equal(status.position, 0.5, 'position')
    t.ok(status.bytesDone > driver.filesize / 5, '> bytesDone')
    t.ok(status.bytesDone < driver.filesize / 3, '< bytesDone')
    t.end()
  })
})
