const sundayDriver = require('./src/index')

let options = {
  file: './tests/docs/500-k.txt',
  // file: './tests/docs/buddyHolly.txt',
  // file: './tests/docs/abc.txt',
  start: '50%',
  end: '80%',
  splitter: "2000",
  // chunkSize: 20,

  each: (str, resume) => {
    console.log('-')
    resume()
  },

  atPercent: {
    50: (status) => {
      console.log('50%!')
    },
    75: () => {
      console.log('75%!')
    },
  },
  atInterval: {
    '1min': (status) => {
      console.log('1 minute')
    },
    '2mins': () => {
      console.log('2 minutes')
    },
  }
}

//23 seconds
//19 seconds
//18 seconds


sundayDriver(options).then((status) => {
  console.log('done!')
})
