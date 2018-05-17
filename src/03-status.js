const round = function(num) {
  return Math.round(num * 100) / 100
}

const getStatus = function() {
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

module.exports = getStatus
