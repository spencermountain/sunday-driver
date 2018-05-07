const fs = require('fs')
const async = require('async');
const events = require('events');
const getStartEnd = require('./_start-end');

const SundayDriver = function(options) {
  //convert percentages, etc.
  options = getStartEnd(options)
  this.file = options.file
  this.filesize = options.filesize
  this.startByte = options.startByte || 0
  this.endByte = options.endByte
  this.encoding = options.encoding || 'utf-8'
  this.splitter = options.splitter || '\n'
  this.chunkSize = options.chunkSize || 2 * 1024
  this.chunk_count = 0

  this.current = ''
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

const round = function(num) {
  return Math.round(num * 100) / 100
}

SundayDriver.prototype.status = function() {
  let result = {
    chunks: this.chunk_count,
    bytes: this.chunk_count * this.chunkSize,
    //the absolute location in the file
    position: 0,
    progress: 0,
  }
  if (this.filesize) {
    result.position = round(result.bytes / this.filesize)
    let totalBytes = this.endByte - this.startByte
    result.progress = round(result.bytes / totalBytes)
  }
  return result
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
    highWaterMark: this.chunkSize //this sets the size for each data chunk
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
