const SundayDriver = require('./src/index')

let options = {
  file: './my/large/file.txt',
  start: 80, //as-percentage
  end: 100, //as-percentage
  splitter: '\n',
}
let runner = new SundayDriver(options)

runner.onEach((chunk) => {
})
runner.onComplete(() => {
})
runner.onError((e) => {
})
runner.status((percentage) => {
})
