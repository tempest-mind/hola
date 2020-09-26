
const { series, src, dest /*, watch, parallel*/ } = require('gulp');
const dl = require('download'); // https://github.com/kevva/download
const agent = require('global-agent'); // https://github.com/gajus/global-agent
const del = require('del');

// Load proxy settings, if applicable, in order to get HTTP requests to work
agent.bootstrap(); // $ export GLOBAL_AGENT_HTTP_PROXY=http://www-proxy-hqdc.us.oracle.com:80

let wd = ''; // Workding directory

//console.log('process.argv', process.argv);

function def(cb) { // default
  // TODO: Add build instructions
  console.log('\n===========================');
  console.log('Usage:');
  console.log('\t$ gulp build');
  console.log('\t$ gulp clean');
  console.log('===========================\n');
  cb();
}

function clean() {
  return del(wd + 'dist');
}

function move() {
  return src(wd + 'src/**')
    .pipe((dest(wd + 'dist')));
}

function download() {
  return Promise.all([
    'https://docs.netlify.com/images/configure-builds-edit-build-settings-ui.png',
    'https://ocepm-oce0003.cec.ocp.oraclecloud.com/content/published/api/v1.1/assets/CONT1515FD21BAD3426EA341E340ABF77FC4/native/404-test-2.png?channelToken=2b99162876d64526a0055886276062ca'
  ].map(url => dl(url, 'downloads')));
}

exports.clean = clean;
exports.move = move;
exports.download = download;
exports.build = series(clean, download, move);
exports.default = def;
