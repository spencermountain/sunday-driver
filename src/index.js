const fs = require('fs')
const events = require("events");

const NotEasy = function(options) {
  this.file = options.file
  this.start = options.start || 0
  this.end = options.end
  this.stream = fs.createReadStream(this.file, {
    encoding: this._encoding
  });
}

// NotEasy.prototype = Object.create(events.EventEmitter.prototype, {
//   constructor: {
//     value: NotEasy,
//     enumerable: false
//   }
// });

module.exports = NotEasy
