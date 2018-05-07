const SundayDriver = require('./src/index')

let options = {
  file: './tests/docs/numbers.txt',
  // file: './tests/docs/buddyHolly.txt',
  // start: 80, //as-percentage
  // end: 100, //as-percentage
  splitter: "100000\n" //"Woo-hoo",
}
let runner = new SundayDriver(options)

runner.on('each', (str, cb) => {
  let lastBit = str.split('\n')
  lastBit = lastBit[lastBit.length - 2]
  console.log('\n\n====== chunk ======    ' + lastBit)
  // console.log(str)
  cb()
})
runner.on('error', (err) => {
  console.log(err)
})
runner.on('end', () => {
  console.log(runner.status())
  console.log('end!')
})
