var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var ext_replace = require('gulp-ext-replace');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
    gulp.src('dev/scss/main.scss')

        .pipe(sourcemaps.init())
        .pipe(sass({includePaths: ['dev/scss/']}))
        .pipe(ext_replace('.css'))
        .pipe(gulp.dest('www/css/'));
});

gulp.task('sass:prod', function () {
    gulp.src('dev/scss/main.scss')

        .pipe(sourcemaps.init())
        .pipe(sass({includePaths: ['dev/scss/']}))
        .pipe(ext_replace('.css'))
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('www/css/'));
});

// gulp.task('browser-sync', function () {
//     browserSync.init(["assets/stylesheets/*.css", "assets/javascripts/*.js", "./*.html"], {
//         server: {
//             baseDir: "./"
//         }
//     });
// });

gulp.task('default', ['sass'/*, 'browser-sync'*/], function () {
    gulp.watch("dev/scss/**/*.scss", ['sass']);
});

gulp.task('production', ['sass:prod'/*, 'browser-sync'*/], function () {
});
