<div align="center">
	<h3>sunday-driver</h3>
	<a href="https://npmjs.org/package/sunday-driver">
		<img src="https://img.shields.io/npm/v/sunday-driver.svg?style=flat-square" />
	</a>
  <a href="https://www.codacy.com/app/spencerkelly86/sunday-driver">
    <img src="https://api.codacy.com/project/badge/grade/1b0f3874f43f4b8c87ac855bb69bca8f" />
  </a>
	<div>process a large file, without thinking</div>
</div>
<p></p>

<div align="center">
  <div><sup>never get ahead of yourself.</sup></div>
</div>

**sunday-driver** works through a large file at a *responsible* rate.

At given points, it pauses to let you consider the data, and waits to resume working, once that's done.

this makes it easier to process a large file, by sizable chunks, without any race-conditions or memory leaking.

it was built to support dispatching multiple workers on the same file, by cpu-core, and letting them run independently and responsibly.

(heavily) inspired by [line-by-line](https://github.com/Osterjour/line-by-line), by [Markus Ostertag](https://github.com/Osterjour)🙏

WIP
`npm i sunday-driver`

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
