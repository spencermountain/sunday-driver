const SundayDriver = require('./src/index')

let options = {
  // file: './tests/testFile.txt',
  file: './tests/smallFile.txt',
  // start: 80, //as-percentage
  // end: 100, //as-percentage
  splitter: "Woo-hoo",
}
let runner = new SundayDriver(options)

runner.on('each', (str, cb) => {
  console.log('\n----chunk----')
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
