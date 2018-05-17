const fs = require('fs');

const init = function() {
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
module.exports = init
