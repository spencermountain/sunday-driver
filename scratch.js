const SundayDriver = require('./src/index')

let options = {
  file: './tests/docs/smallwiki-latest-pages-articles.xml',
  splitter: "</page>",
  chunkSize: 20
}

let driver = new SundayDriver(options)
driver.on('each', (str, cb) => {
  // console.log(str)
  console.log('-----------')
  cb()
})
driver.on('end', () => {
  console.log('-done-')
})
