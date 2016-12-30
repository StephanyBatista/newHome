'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
 
gulp.task('sass', function () {
  return gulp.src('./client/css/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./server/web/public/css'));
});
 
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});