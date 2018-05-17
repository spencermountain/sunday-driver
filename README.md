<div align="center">
	<h3>sunday-driver</h3>
	<a href="https://npmjs.org/package/sunday-driver">
		<img src="https://img.shields.io/npm/v/sunday-driver.svg?style=flat-square" />
	</a>
  <a href="https://www.codacy.com/app/spencerkelly86/sunday-driver">
    <img src="https://api.codacy.com/project/badge/grade/1b0f3874f43f4b8c87ac855bb69bca8f" />
  </a>
	<div>process a large file, at a steady cruise</div>
</div>
<p></p>

<div align="center">
	<h2>🕶️</h2>
  <div><sup> - slow is smooth, smooth is fast -</sup></div>
</div>

**sunday-driver** works through a large file *at a responsible* pace - it pauses to let you consider the data, at given points, and waits to resume working once that's all done.

this allows processing a large file, by sizable chunks, without any race-conditions or memory leaking.

(heavily) inspired by [line-by-line](https://github.com/Osterjour/line-by-line), by [Markus Ostertag](https://github.com/Osterjour)🙏

<div align="center">
  <code>npm i sunday-driver</code>
</div>

```js
const SundayDriver = require('sunday-driver')

let options= {
  file: './my/large/file.tsv',
  splitter: '\n',
  start: '80%', //as percentages, or in bytes
  end: '100%',
}

let runner = new SundayDriver(options)

//don't forget this listener
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
  chunksDone:: 10,      //how many times we've called .on('each',fn)
	bytesDone:: 20480,    //how many bytes we've processed so far
	position: 34.42, //where, in percentage, we are in the file. (if we didn't start at the top!)
	progress: 68.84  //how far, in percentage, we are to being complete
}*/
```

it was built to support unleashing multiple workers on the same file, and letting them run safely and responsibly, without blowing any fuses.

MIT
