const SundayDriver = require('./src/index')

let options = {
  file: './tests/testFile.txt',
  // file: './tests/buddyHolly.txt',
  // start: 80, //as-percentage
  // end: 100, //as-percentage
  splitter: "50\n" //"Woo-hoo",
}
let runner = new SundayDriver(options)

runner.on('each', (str, cb) => {
  console.log('\n\n====== chunk ======')
  console.log(str)
  cb()
})
runner.on('error', (err) => {
  console.log(err)
})
runner.on('end', () => {
  console.log('end!')
})

// runner.status((percentage) => {
// })
