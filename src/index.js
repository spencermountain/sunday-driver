const fs = require('fs')
const events = require('events');

const SundayDriver = function(options) {
  this.file = options.file
  this.starting = options.start || 0
  this.ending = options.end
  this.encoding = options.encoding || 'utf-8'
  this.splitter = options.splitter || '\n'
  this.current = ''
  events.EventEmitter.call(this);
  setImmediate(() => {
    this.init();
  });
}

//hook-up this event-emitter fooey
SundayDriver.prototype = Object.create(events.EventEmitter.prototype, {
  constructor: {
    value: SundayDriver,
    enumerable: false
  }
});

// SundayDriver.prototype.doChunk = function(chunk) {}

//on whatever-sized data node gives us
SundayDriver.prototype.onData = function(data) {
  let _this = this
  this.current += data
  if (data.indexOf(this.splitter) === -1) {
    return //keep on going!
  }
  //ok, we parse a chunk here
  this.stream.pause();
  let parts = this.current.split(this.splitter)
  let chunk = parts[0] + this.splitter
  this.emit('each', chunk, () => {
    _this.current = parts[1]
    _this.stream.resume()
  })
}

//okay, this is basically the constructor.
// get the read-stream started...
SundayDriver.prototype.init = function() {
  this.stream = fs.createReadStream(this.file, {
    encoding: this.encoding || 'utf8'
  });
  //wire-up our listeners, too
  this.stream.on('error', (err) => {
    this.emit('error', err)
  });
  this.stream.on('data', (data) => {
    this.onData(data)
  });
  this.stream.on('end', () => {
    this.emit('chunk', this.current, () => {
      this.emit('end')
    })
  });
}

//aliases
SundayDriver.prototype.onComplete = SundayDriver.prototype.onEnd

module.exports = SundayDriver
