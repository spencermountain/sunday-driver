const async = require('async');
const events = require('events');
const getStartEnd = require('./01-prep');
const init = require('./02-start');
const getStatus = require('./03-status');

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
  let self = this
  this.stream.pause();
  let fns = arr.map((chunk) => {
    return function(cb) {
      chunk = chunk + self.splitter
      self.doChunk(chunk, cb)
    }
  })
  async.series(fns, () => {
    self.stream.resume()
    callback()
  })
}

//on whatever-sized data node gives us
SundayDriver.prototype.onData = function(data) {
  this.current += data
  // let len = this.splitter.length
  //dont re-search the whole string, but use a bit of it
  // let tester = this.current.substr(this.current.length - len, this.current.length)
  // tester += data
  // console.log(this.current)
  if (this.current.indexOf(this.splitter) === -1) {
    // console.log(' - empty')
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
SundayDriver.prototype.init = init

//how far are we into this file?
SundayDriver.prototype.status = getStatus

//aliases
SundayDriver.prototype.onComplete = SundayDriver.prototype.onEnd

module.exports = SundayDriver
