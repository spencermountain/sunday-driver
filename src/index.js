const events = require('events');
const prep = require('./01-prep');
const init = require('./02-start');
const getStatus = require('./03-status');

const SundayDriver = function(options) {
  //convert percentages, etc.
  options = prep(options)
  this.file = options.file
  this.filesize = options.filesize
  this.startByte = options.startByte || 0
  this.endByte = options.endByte || this.filesize
  this.encoding = options.encoding || 'utf-8'
  this.splitter = options.splitter || '\n'
  this.chunkSize = options.chunkSize || 2 * 1024
  this.chunk_count = 0
  this.bytesDone = 0

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
    this.bytesDone += chunk.length
    callback()
  })
}

//handle multiple chunks, if we got them
// SundayDriver.prototype.doChunks = function(arr, callback) {}

//on whatever-sized data node gives us
SundayDriver.prototype.onData = function(data) {
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

//okay, this is basically the constructor.
// get the read-stream started...
SundayDriver.prototype.init = init

//how far are we into this file?
SundayDriver.prototype.status = getStatus

//aliases
SundayDriver.prototype.onComplete = SundayDriver.prototype.onEnd

module.exports = SundayDriver
