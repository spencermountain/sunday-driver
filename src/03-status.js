const round = function(num) {
  return Math.round(num * 100) / 100
}

const getStatus = function() {
  let result = {
    bytesDone: this.bytesDone,
    chunksDone: this.chunk_count,
    position: 0, //the absolute location in the file
    progress: 0, //relative status between start-end
  }
  if (this.filesize) {
    let place = this.startByte + result.bytesDone
    result.position = round(place / this.filesize)
    let totalBytes = this.endByte - this.startByte
    result.progress = round(result.bytesDone / totalBytes)
  }
  return result
}

module.exports = getStatus
