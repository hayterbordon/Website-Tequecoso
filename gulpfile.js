const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');
const watch = require('gulp-watch');

// 1. Compila Sass a CSS
function compileSass() {
  return gulp.src('scss/**/*.scss') // Updated path
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css/')); // Updated path
}

// 2. Concatena archivos JS
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
  .pipe(gulp.dest('js/plugins/')); // Updated path
}

// 3. Concatena archivos CSS
function concatCssPlugins() {
  return gulp.src([
    'bower_components/font-awesome/css/font-awesome.min.css',
    'css/animate.css',
    'bower_components/magnific-popup/dist/magnific-popup.css',
    'bower_components/owl.carousel/dist/assets/owl.carousel.min.css',
    'bower_components/owl.carousel/dist/assets/owl.theme.default.min.css',
    'et-line-font/style.css',
    'bootstrap/dist/css/bootstrap.min.css'
  ])
  .pipe(concatCss("plugins.css"))
  .pipe(gulp.dest('css/plugins/')); // Updated path
}

// 4. Vigila cambios en archivos SCSS
function watchFiles() {
  gulp.watch('scss/**/*.scss', compileSass);
}

// Exportar tareas
exports.sass = compileSass;
exports.concat = concatJs;
exports.concatCss = concatCssPlugins;
exports.watch = watchFiles;
exports.build = gulp.series(compileSass, concatJs, concatCssPlugins);
exports.default = exports.build;
