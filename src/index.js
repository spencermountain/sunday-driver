const fs = require('fs')
// const events = require("events");

const SundayDriver = function(options) {
  this.file = options.file
  this.starting = options.start || 0
  this.ending = options.end
  this.splitter = '\n'
  this.current = ''

  this.stream = fs.createReadStream(this.file, {
    encoding: options.encoding || 'utf8'
  });
  this.stream.on('error', this.onError);
  this.stream.on('end', this.onEnd);

  this.stream.on('data', (data) => {
    if (data.indexOf(this.splitter) === -1) {
      this.current += data
    } else { //we split here
      this.stream.pause();
      let split = data.split(this.splitter)
      this.current += split[0]
      this.onEach(this.current)
      this.current = split.slice(1).join() //?
      this.stream.resume()
    }

  })
}

// NotEasy.prototype = Object.create(events.EventEmitter.prototype, {
//   constructor: {
//     value: NotEasy,
//     enumerable: false
//   }
// });

module.exports = SundayDriver
