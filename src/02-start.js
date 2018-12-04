const fs = require('fs');

const init = function() {
  this.stream = fs.createReadStream(this.file, {
    encoding: this.encoding || 'utf-8',
    start: Math.ceil(this.startByte),
    end: Math.floor(this.endByte),
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
    this.onEnd()
  });
}
module.exports = init
