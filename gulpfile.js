// Gulpfile.js
const gulp = require('gulp');
const sassCompiler = require('gulp-sass')(require('sass')); // Renombrado para evitar confusión con la tarea
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');
// const watch = require('gulp-watch'); // No es necesario si usas gulp.watch (incorporado)

// 1. Compila Sass a CSS
function compileSass() {
  return gulp.src('scss/**/*.scss')
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(gulp.dest('css/'));
}

// 2. Concatena archivos JS
function concatJs() {
  return gulp.src([
    'bower_components/jquery/dist/jquery.min.js',
    'bootstrap/dist/js/bootstrap.min.js', // Asegúrate que esta ruta es correcta
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

// 3. Concatena archivos CSS
function concatCssPlugins() {
  return gulp.src([
    'bower_components/font-awesome/css/font-awesome.min.css',
    'css/animate.css', // Asegúrate que este archivo existe
    'bower_components/magnific-popup/dist/magnific-popup.css',
    'bower_components/owl.carousel/dist/assets/owl.carousel.min.css',
    'bower_components/owl.carousel/dist/assets/owl.theme.default.min.css',
    'et-line-font/style.css', // Asegúrate que esta ruta es correcta
    'bootstrap/dist/css/bootstrap.min.css' // Asegúrate que esta ruta es correcta
  ])
  .pipe(concatCss("plugins.css"))
  .pipe(gulp.dest('css/plugins/'));
}

// 4. Vigila cambios en archivos SCSS
function watchFiles() {
  gulp.watch('scss/**/*.scss', compileSass);
  // También podrías querer vigilar cambios en JS o CSS si tienes tareas para ellos
  // gulp.watch('js/**/*.js', concatJs); // Ejemplo
}

// Exportar tareas
exports.sass = compileSass; // Tarea renombrada en Gulpfile para evitar conflicto
exports.concatJs = concatJs; // Exportar con un nombre único
exports.concatCss = concatCssPlugins; // Exportar con un nombre único
exports.watch = watchFiles;
exports.build = gulp.series(compileSass, concatJs, concatCssPlugins);
exports.default = exports.build;
