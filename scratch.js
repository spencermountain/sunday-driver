const SundayDriver = require('./src/index')

let options = {
  // file: './tests/docs/500-k.txt',
  file: './tests/docs/buddyHolly.txt',
  start: '50%',
  end: '100%',
  splitter: "\n"
}
let runner = new SundayDriver(options)

runner.on('each', (str, cb) => {
  console.log(str)
  // let lastBit = str.split('\n')
  // lastBit = lastBit[lastBit.length - 2]
  // console.log('\n\n====== chunk ======    ' + lastBit)
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
