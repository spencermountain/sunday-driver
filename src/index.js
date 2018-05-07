const fs = require('fs')
const async = require('async');
const events = require('events');
const getStartEnd = require('./_start-end');

const SundayDriver = function(options) {
  //convert percentages, etc.
  options = getStartEnd(options)
  this.file = options.file
  this.startByte = options.startByte || 0
  this.endByte = options.endByte
  this.encoding = options.encoding || 'utf-8'
  this.splitter = options.splitter || '\n'
  this.current = ''
  this.chunk_count = 0
  events.EventEmitter.call(this);
  setImmediate(() => {
    this.init();
  });
}

//hook-up this event-emitter fooey..
SundayDriver.prototype = Object.create(events.EventEmitter.prototype, {
  constructor: {
    value: SundayDriver,
    enumerable: false
  }
});

//send this data to our user..
SundayDriver.prototype.doChunk = function(chunk, callback) {
  this.emit('each', chunk, () => {
    this.current = ''
    this.chunk_count += 1
    callback()
  })
}

//handle multiple chunks, if we got them
SundayDriver.prototype.doChunks = function(arr, callback) {
  let _this = this
  this.stream.pause();
  let fns = arr.map((chunk) => {
    return function(cb) {
      chunk = chunk + this.splitter
      _this.doChunk(chunk, cb)
    }
  })
  async.series(fns, () => {
    _this.stream.resume()
    callback()
  })
}

SundayDriver.prototype.status = function() {
  return {
    chunks: this.chunk_count
  }
}

//on whatever-sized data node gives us
SundayDriver.prototype.onData = function(data) {
  this.current += data
  if (data.indexOf(this.splitter) === -1) {
    return //keep on going!
  }
  //ok, we parse a chunk here
  let parts = this.current.split(this.splitter)

  //do all chunks, except for last one
  let last = parts.pop()
  this.doChunks(parts, () => {
    this.current = last
  })
}

//okay, this is basically the constructor.
// get the read-stream started...
SundayDriver.prototype.init = function() {
  this.stream = fs.createReadStream(this.file, {
    encoding: this.encoding || 'utf-8',
    start: this.startByte,
    end: this.endByte,
    highWaterMark: this.chunkSize || 2 * 1024 //this sets the size for each data chunk
  });
  //wire-up our listeners, too
  this.stream.on('error', (err) => {
    this.emit('error', err)
  });
  this.stream.on('data', (data) => {
    this.onData(data)
  });

  this.stream.on('end', () => {
    //do we need to do the last one?
    if (this.current) {
      this.doChunk(this.current, () => {
        this.emit('end')
      })
    } else {
      //end it.
      this.emit('end')
    }
  });
}

//aliases
SundayDriver.prototype.onComplete = SundayDriver.prototype.onEnd

module.exports = SundayDriver
