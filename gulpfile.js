var gulp = require('gulp');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass')(require('sass'));
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('scripts', function() {
    return gulp.src('js/scripts.js')
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(uglify({
            output: {
                comments: '/^!/'
            }
        }))
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('js'));
});

gulp.task('styles', function () {
    return gulp.src('./scss/styles.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./css'));
});

gulp.task('build', gulp.parallel('scripts', 'styles'));

gulp.task('watch', function() {
    gulp.watch('js/scripts.js', gulp.series('scripts'));
    gulp.watch('scss/styles.scss', gulp.series('styles'));
});
