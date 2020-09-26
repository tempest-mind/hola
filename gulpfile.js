
const { series, parallel, src, dest, watch } = require('gulp');
const del = require('del');

let wd = ''; // Workding directory

//console.log('process.argv', process.argv);

function defaultTask(cb) {
  // place code for your default task here
  cb();
}

function clean() {
  return del(wd + 'dist');
}

function move() {
  return src(wd + 'src/**')
    .pipe((dest(wd + 'dist')));
}


exports.default = defaultTask;
exports.clean = clean;
exports.move = move;

exports.build = series(clean, move);