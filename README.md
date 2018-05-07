(heavily) inspired by [line-by-line](https://github.com/Osterjour/line-by-line), by [Markus Ostertag](https://github.com/Osterjour)


WIP
<!-- `npm i sunday-driver` -->

```js
const SundayDriver = require('sunday-driver')

let options= {
  file: './my/large/file.txt',
  start: 80, //as-percentage
  end: 100,  //as-percentage
  splitter: '\n',
}

let runner = new SundayDriver(options)

runner.onEach((data)=>{})
runner.onComplete(()=>{})
runner.onError((e)=>{})
runner.status((percentage)=>{})

```

MIT
