const gulp = require('gulp');
const sassCompiler = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');
const del = require('del');

function cleanDist() {
  return del(['dist/**', '!dist']);
}

function compileSass() {
  return gulp.src('scss/style-saas-landing.scss')
    .pipe(sassCompiler({
      includePaths: ['scss', 'scss-saas-software']
    }).on('error', sassCompiler.logError))
    .pipe(gulp.dest('css/'));
}


function concatJs() {
  return gulp.src([
    'bower_components/jquery/dist/jquery.min.js',
    'bootstrap/dist/js/bootstrap.min.js',
    'js/jquery.easing.min.js',
    'bower_components/wow/dist/wow.min.js',
    'js/jquery.preloader.min.js',
    'bower_components/magnific-popup/dist/jquery.magnific-popup.min.js',
    'bower_components/jquery-knob/dist/jquery.knob.min.js',
    'bower_components/owl.carousel/dist/owl.carousel.min.js',
    'bower_components/jarallax/dist/jarallax.min.js',
    'bower_components/jarallax/dist/jarallax-video.min.js',
    'js/smooth-scroll.min.js'
  ])
  .pipe(concat('plugins.js'))
  .pipe(gulp.dest('js/plugins/'));
}

// Concatena CSS
function concatCssPlugins() {
  return gulp.src([
    'bower_components/font-awesome/css/font-awesome.min.css',
    'css/animate.css',
    'bower_components/magnific-popup/dist/magnific-popup.css',
    'bower_components/owl.carousel/dist/assets/owl.carousel.min.css',
    'bower_components/owl.carousel/dist/assets/owl.theme.default.min.css',
    'bootstrap/dist/css/bootstrap.min.css'
  ], { allowEmpty: true })
  .pipe(concatCss('plugins.css'))
  .pipe(gulp.dest('css/plugins/'));
}


function copyFiles() {
  return gulp.src([
    'index.html',
    'css/**/*',
    'js/**/*',
    'images/**/*'
  ], { base: '.' })
  .pipe(gulp.dest('dist'));
}


function watchFiles() {
  gulp.watch('scss/**/*.scss', compileSass);
  gulp.watch('js/**/*.js', concatJs);
}

exports.clean = cleanDist;
exports.sass = compileSass;
exports.concatJs = concatJs;
exports.concatCss = concatCssPlugins;
exports.watch = watchFiles;


exports.build = gulp.series(
  cleanDist,
  compileSass,
  concatJs,
  concatCssPlugins,
  copyFiles
);

exports.default = exports.build;
