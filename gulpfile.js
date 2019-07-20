const gulp = require('gulp');
const sass = require('gulp-sass');
const { src, dest } = require('gulp');
let cleanCSS = require('gulp-clean-css');

// Watch task
gulp.task('default', function() {
    gulp.watch('./assets/scss/**/*.scss', gulp.series('styles'));
});


// converts sass files to css
function styles(cb) {
    return src('./assets/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(dest('./client/public/css'))
}

exports.styles = styles;