var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var deploy      = require('gulp-gh-pages');

gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: "./"
  });
  //Watch for changes in scss files and trigger sass task
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('*.html').on('change', browserSync.reload);
});

/* This task will compile .scss to css and afterwards
 * stream changes to browserSync
 */
gulp.task('sass', function() {
  gulp.src('sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./css'))
      .pipe(browserSync.stream());
});

//Default gulp task will run serve task which itself will trigger sass task
gulp.task('default', ['serve']);


//Task for deploying to GitHub Pages
gulp.task('deploy', function () {
  return gulp.src("./dist/**/*")
    .pipe(deploy())
});
