(heavily) inspired by [line-by-line](https://github.com/Osterjour/line-by-line), by [Markus Ostertag](https://github.com/Osterjour)


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

**sunday-driver** doesn't ever get-ahead of itself - it pauses to let you do your work, and only resumes when you're done.

this makes it easy to manage multiple workers on the same file, without any race-conditions or memory leaking.

MIT
