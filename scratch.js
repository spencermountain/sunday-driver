const SundayDriver = require('./src/index')

let options = {
  file: './tests/docs/500-k.txt',
  // file: './tests/docs/buddyHolly.txt',
  // file: './tests/docs/abc.txt',
  start: '50%',
  end: '80%',
  splitter: "20",
// chunkSize: 20,
}

//23 seconds
//19 seconds
//18 seconds

let driver = new SundayDriver(options)
driver.on('each', (str, cb) => {
  // console.log(str)
  console.log(driver.status())
  console.log('--')
  // console.log(str)
  cb()
})
driver.on('error', (e) => {
  console.log(e)
})
driver.on('end', () => {
  console.log(driver.status())
  console.log('-')
// console.log(text)
})
