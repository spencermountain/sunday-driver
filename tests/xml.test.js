let test = require('tape')
const SundayDriver = require('../src/index')

test('parse xml', function(t) {
  let count = 0
  let options = {
    file: __dirname + '/docs/smallwiki-latest-pages-articles.xml',
    splitter: "</page>",
    chunkSize: 20,
    each: (str, cb) => {
      count += 1
      cb()
    }
  }
  new SundayDriver(options).then(() => {
    t.equal(count, 2005, 'got all xml pages')
    // let status = driver.status()
    // console.log(status)
    t.end()
  })
})
