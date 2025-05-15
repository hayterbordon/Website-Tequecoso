const gulp = require('gulp');
const sassCompiler = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');

// Compila solo el archivo principal SCSS para generar style-saas-landing.css en /css
function compileSass() {
  return gulp.src('scss/style-saas-landing.scss') // Archivo principal
    .pipe(sassCompiler({
      includePaths: ['scss', 'scss-saas-software'] // Para importar parciales sin rutas largas
    }).on('error', sassCompiler.logError))
    .pipe(gulp.dest('css/')); // Carpeta destino
}

// Concatena JS de plugins externos en js/plugins/plugins.js
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

// Concatena CSS de plugins externos en css/plugins/plugins.css
function concatCssPlugins() {
  return gulp.src([
    'bower_components/font-awesome/css/font-awesome.min.css',
    'css/animate.css', // Asegúrate que exista
    'bower_components/magnific-popup/dist/magnific-popup.css',
    'bower_components/owl.carousel/dist/assets/owl.carousel.min.css',
    'bower_components/owl.carousel/dist/assets/owl.theme.default.min.css',
    // 'et-line-font/style.css', // Comentado porque no existe
    'bootstrap/dist/css/bootstrap.min.css'
  ], { allowEmpty: true })
  .pipe(concatCss('plugins.css'))
  .pipe(gulp.dest('css/plugins/'));
}

// Vigila cambios en SCSS y JS para recompilar automáticamente
function watchFiles() {
  gulp.watch('scss/**/*.scss', compileSass);
  gulp.watch('js/**/*.js', concatJs);
}

exports.sass = compileSass;
exports.concatJs = concatJs;
exports.concatCss = concatCssPlugins;
exports.watch = watchFiles;

// Build completo: compila sass y concatena JS y CSS plugins
exports.build = gulp.series(compileSass, concatJs, concatCssPlugins);
exports.default = exports.build;
