const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); // Usando gulp-sass v5+ con Dart Sass
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');
const { watch } = require('gulp'); // Usando watch de Gulp 4+

// Tarea para compilar SASS
gulp.task('sass', function () {
    return gulp.src('html/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError)) // Maneja errores de compilación
        .pipe(gulp.dest('html/css/'));
});

// Tarea para observar cambios en SASS (Gulp 4+)
gulp.task('watch', function () {
    watch('html/scss/**/*.scss', gulp.series('sass'));
});

// Tarea para concatenar JS
gulp.task('concat', function () {
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
});

// Tarea para concatenar CSS
gulp.task('concatCss', function () {
    const cssFiles = [
        'html/bower_components/font-awesome/css/font-awesome.min.css',
        'html/css/animate.css',
        'html/bower_components/magnific-popup/dist/magnific-popup.css',
        'html/bower_components/owl.carousel/dist/assets/owl.carousel.min.css',
        'html/bower_components/owl.carousel/dist/assets/owl.theme.default.min.css',
        'html/bootstrap/dist/css/bootstrap.min.css'
    ];

    // Verificar si el archivo 'style.css' de linearicons existe antes de agregarlo
    const fs = require('fs');
    const lineariconsPath = 'html/linearicons/style.css';
    if (fs.existsSync(lineariconsPath)) {
        cssFiles.push(lineariconsPath); // Solo agregar si el archivo existe
    }

    return gulp.src(cssFiles, { allowEmpty: true }) // Permite archivos vacíos si no se encuentran
        .pipe(concatCss('plugins.css'))
        .pipe(gulp.dest('html/css/plugins/'));
});

// Tarea por defecto (ejecuta todas las tareas)
gulp.task('default', gulp.series('sass', 'concat', 'concatCss'));

// Tarea para producción (Netlify)
gulp.task('build', gulp.series('sass', 'concat', 'concatCss'));
