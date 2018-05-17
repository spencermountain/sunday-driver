let test = require('tape')
const SundayDriver = require('../src/index')

test('parse xml', function(t) {
  let options = {
    file: __dirname + '/docs/smallwiki-latest-pages-articles.xml',
    splitter: "</page>",
    chunkSize: 20
  }
  let driver = new SundayDriver(options)
  let count = 0
  driver.on('each', (str, cb) => {
    count += 1
    cb()
  })
  driver.on('end', () => {
    t.equal(count, 2005, 'got all xml pages')
    t.end()
  })
})
