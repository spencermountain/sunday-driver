**sunday-driver** never gets ahead of itself - it works through a large file at a *responsible* rate.

At given points, it pauses to let you consider the data, and waits to resume working, once that's done.

this makes it easier to process a large file, by sizable chunks, without any race-conditions or memory leaking.

it was built to support dispatching multiple workers on the same file, by cpu-core, and letting them run independently and responsibly.

(heavily) inspired by [line-by-line](https://github.com/Osterjour/line-by-line), by [Markus Ostertag](https://github.com/Osterjour)🙏

WIP
<!-- `npm i sunday-driver` -->

```js
const SundayDriver = require('sunday-driver')

let options= {
  file: './my/large/file.tsv',
  splitter: '\n',
  //as percentages:
  start: '80%',
  end: '100%',
}

let runner = new SundayDriver(options)
runner.on('each', (data, resume) => {
  console.log(data)
  resume()
})
runner.on('end', () => {
  console.log('done!')
})
runner.on('error', console.error)

runner.status() // '85%'
```


MIT
