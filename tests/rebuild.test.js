let test = require('tape')
const fs = require('fs');
const SundayDriver = require('../src/index')

const hitIt = function(options, callback) {
  let text = ''
  options.each = (str, cb) => {
    text += str
    cb()
  }
  new SundayDriver(options).then(() => {
    callback(text)
  })
}

let arr = [
  '/docs/500-k.txt',
  '/docs/abc.txt',
  '/docs/buddyHolly.txt',
  '/docs/Clinton_1995.txt',
  '/docs/episode-122.txt',
  '/docs/goyourownway.txt',
  '/docs/some_words.txt',
  '/docs/sweatersong.txt',
  '/docs/the_doggfather.txt',
  '/docs/smallwiki-latest-pages-articles.xml',
]

test('reproduce text tiny', function(t) {
  t.plan(arr.length)
  arr.forEach((doc) => {
    let path = __dirname + doc
    let options = {
      file: path,
      splitter: "\n",
      chunkSize: 20
    }
    hitIt(options, (text) => {
      const original = fs.readFileSync(path).toString()
      t.equal(text, original, 'file ' + doc)
    })
  })
})

test('reproduce text larger', function(t) {
  t.plan(arr.length)
  arr.forEach((doc) => {
    let path = __dirname + doc
    let options = {
      file: path,
      splitter: "jflskfjej",
      chunkSize: 2000
    }
    hitIt(options, (text) => {
      const original = fs.readFileSync(path).toString()
      t.equal(text, original, 'file ' + doc)
    })
  })
})
