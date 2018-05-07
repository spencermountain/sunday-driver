read a large file, to/from any point, without loading into memory.

(heavily) inspired by [line-by-line](https://github.com/Osterjour/line-by-line), by [Markus Ostertag](https://github.com/Osterjour)

`npm i not-easy`

```js
const SundayDriver = require('sunday-driver')

let options= {
  file:'./my/large/file.txt',
  start:0,
  end:10000,
  splitter:'\n',
}

let runner = new SundayDriver(options, ()=>{
  console.log('done!')
})

runner.onEach(()=>{})
runner.status()

```

MIT
