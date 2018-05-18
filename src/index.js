const events = require('events');
const prep = require('./01-prep');
const init = require('./02-start');
const getStatus = require('./03-status');

const SundayDriver = function(options) {
  this.file = options.file
  this.filesize = options.filesize
  this.startByte = options.startByte || 0
  this.endByte = options.endByte || this.filesize
  this.encoding = options.encoding || 'utf-8'
  this.splitter = options.splitter || '\n'
  this.chunkSize = options.chunkSize || 2 * 1024
  this.each = options.each || ((str, resume) => resume())
  this.chunk_count = 0
  this.bytesDone = 0

  this.logPoints = options.logPoints
  this.intervals = options.intervals

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
  this.each(chunk, () => {
    this.current = ''
    this.chunk_count += 1
    callback()
  })
}

//handle multiple chunks, if we got them
// SundayDriver.prototype.doChunks = function(arr, callback) {}

//on whatever-sized data node gives us
SundayDriver.prototype.onData = function(data) {
  this.bytesDone += data.length

  //should we log this point?
  if (this.logPoints[0] && this.logPoints[0].byte && this.bytesDone >= this.logPoints[0].byte) {
    this.logPoints[0].fn(this.status())
    this.logPoints.shift()
  }

  let len = this.splitter.length
  //dont re-search the whole string, test the last bit of it
  let tester = this.current.substr(this.current.length - len, this.current.length)
  this.current += data
  tester = tester + data
  if (tester.indexOf(this.splitter) === -1) {
    return //keep on going!
  }
  //ok, we parse a chunk here
  let parts = this.current.split(this.splitter)

  //do all chunks, except for last one
  let last = parts.pop()

  //emit each chunk over to user
  this.stream.pause();
  let done = 0
  for (let i = 0; i < parts.length; i += 1) {
    parts[i] = parts[i] + this.splitter
    this.doChunk(parts[i], () => {
      done += 1
      if (done >= parts.length) {
        this.current = last
        this.stream.resume() //go!
      }
    })
  }
}

SundayDriver.prototype.onEnd = function() {
  //close-up the interval-loggers
  this.intervals.forEach((interval) => {
    clearInterval(interval)
  })
  //do we need to do the last one?
  if (this.current) {
    this.doChunk(this.current, () => {
      this.emit('end')
    })
  } else {
    //end it.
    this.emit('end')
  }
}
//okay, this is basically the constructor.
// get the read-stream started...
SundayDriver.prototype.init = init

//how far are we into this file?
SundayDriver.prototype.status = getStatus

//aliases
SundayDriver.prototype.onComplete = SundayDriver.prototype.onEnd

const goNow = function(options) {
  options = prep(options)
  let driver = new SundayDriver(options)
  //convert percentages, etc.
  return new Promise((resolve, reject) => {
    driver.on('end', () => {
      resolve(driver.status())
    })
    driver.on('error', reject)
  })
}

module.exports = goNow
