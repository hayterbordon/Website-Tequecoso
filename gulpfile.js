const gulp = require('gulp');
const sass = require('gulp-dart-sass'); // Reemplazo moderno de gulp-sass
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');
const watch = require('gulp-watch');

// 1. Compila Sass a CSS
function compileSass() {
  return gulp.src('html/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('html/css/'));
}

// 2. Concatena archivos JS
function concatJs() {
  return gulp.src([
    'html/bower_components/jquery/dist/jquery.min.js',
    'html/bootstrap/dist/js/bootstrap.min.js',
    'html/js/jquery.easing.min.js',
    'html/bower_components/wow/dist/wow.min.js',
    'html/js/jquery.preloader.min.js',
    'html/bower_components/magnific-popup/dist/jquery.magnific-popup.min.js',
    'html/bower_components/jquery-knob/dist/jquery.knob.min.js',
    'html/bower_components/owl.carousel/dist/owl.carousel.min.js',
    'html/bower_components/jarallax/dist/jarallax.min.js',
    'html/bower_components/jarallax/dist/jarallax-video.min.js',
    'html/js/smooth-scroll.min.js'
  ])
  .pipe(concat('plugins.js'))
  .pipe(gulp.dest('html/js/plugins/'));
}

// 3. Concatena archivos CSS
function concatCssPlugins() {
  return gulp.src([
    'html/bower_components/font-awesome/css/font-awesome.min.css',
    'html/css/animate.css',
    'html/bower_components/magnific-popup/dist/magnific-popup.css',
    'html/bower_components/owl.carousel/dist/assets/owl.carousel.min.css',
    'html/bower_components/owl.carousel/dist/assets/owl.theme.default.min.css',
    'html/et-line-font/style.css',
    'html/bootstrap/dist/css/bootstrap.min.css'
  ])
  .pipe(concatCss("plugins.css"))
  .pipe(gulp.dest('html/css/plugins/')); // Cambiado a una subcarpeta más organizada
}

// 4. Vigila cambios en archivos SCSS
function watchFiles() {
  gulp.watch('html/scss/**/*.scss', compileSass);
}

// Tareas públicas (para ejecutar desde la terminal)
exports.sass = compileSass;
exports.concat = concatJs;
exports.concatCss = concatCssPlugins;
exports.watch = watchFiles;
exports.build = gulp.series(compileSass, concatJs, concatCssPlugins); // Tarea principal
exports.default = exports.build; // Por si ejecutas solo "gulp"
