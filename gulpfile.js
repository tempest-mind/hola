
const { series, prallel, src, dest, watch } = require('gulp');

function defaultTask(cb) {
  "use strict";  
  // place code for your default task here
  cb();
}

exports.default = defaultTask;