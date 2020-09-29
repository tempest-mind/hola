
const { series, src, dest, parallel /*, watch*/ } = require('gulp');
const dl = require('download'); // https://github.com/kevva/download
const agent = require('global-agent'); // https://github.com/gajus/global-agent
const del = require('del');

// Load proxy settings, if applicable, in order to get HTTP requests to work
agent.bootstrap(); // $ export GLOBAL_AGENT_HTTP_PROXY=http://www-proxy-hqdc.us.oracle.com:80

let wd = ''; // Workding directory

//console.log('process.argv', process.argv);

function cleanDist() {
  return del(wd + 'dist');
}
function cleanDownloads() {
  return del(wd + 'downloads');
}

function moveImages() {
  return src(wd + 'downloads/*png')
    .pipe((dest(wd + 'dist/img')));
}

function moveSrc() {
  return src(wd + 'src/**')
    .pipe((dest(wd + 'dist')));
}

function download() {
  return Promise.all([
    'https://docs.netlify.com/images/configure-builds-edit-build-settings-ui.png',
    'https://ocepm-oce0003.cec.ocp.oraclecloud.com/content/published/api/v1.1/items/CONT1515FD21BAD3426EA341E340ABF77FC4?channelToken=2b99162876d64526a0055886276062ca',
    'https://ocepm-oce0003.cec.ocp.oraclecloud.com/content/published/api/v1.1/assets/CONT1515FD21BAD3426EA341E340ABF77FC4/native/404-test-2.png?channelToken=2b99162876d64526a0055886276062ca'
  ].map(url => dl(url, 'downloads')));
}

exports.clean = parallel(cleanDist, cleanDownloads);
exports.move = parallel(moveImages, moveSrc);
exports.download = download;
exports.build = series(exports.clean, exports.download, exports.move);
exports.default = exports.build;
