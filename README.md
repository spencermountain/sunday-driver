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
  <div><sup>cruise right through it</sup></div>
</div>

**sunday-driver** never gets ahead of itself. It works through a large file at a *responsible* rate.

At given points, it pauses to let you consider the data, and waits to resume working, once that's done.

this makes it easier to process a large file, by sizable chunks, without any race-conditions or memory leaking.

it was built to support dispatching multiple workers on the same file, and letting them run independently and responsibly.

(heavily) inspired by [line-by-line](https://github.com/Osterjour/line-by-line), by [Markus Ostertag](https://github.com/Osterjour)🙏

`npm i sunday-driver`

```js
const SundayDriver = require('sunday-driver')

let options= {
  file: './my/large/file.tsv',
  splitter: '\n',
  start: '80%', //as percentages, or in bytes
  end: '100%',
}

let runner = new SundayDriver(options)

//gets a the same thing as you would from a .split()
runner.on('each', (chunk, resume) => {
  console.log(chunk)//do your thing..
  resume()
})
runner.on('end', () => {
  console.log('done!')
})
runner.on('error', console.error)
```

at any time, when you want a report, you can call `.status()`:
```js
runner.status()
/*{
  chunks: 10,      //how many times we've called .on('each',fn)
	bytes: 20480,    //how many bytes we've processed so far
	position: 34.42, //where, in percentage, we are in the file. (if we didn't start at the top!)
	progress: 68.84  //how far, in percentage, we are to being complete
}*/
```

MIT
