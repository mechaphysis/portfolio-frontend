var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var ghPages = require('gulp-gh-pages');

gulp.task('serve', ['sass'], function() {
  //Watch for changes in scss files and trigger sass task
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('./*.html', ['html-to-dist']);
  gulp.watch('img/**/*', ['img-to-dist']);
  gulp.watch('js/*', ['js-to-dist']);
  browserSync.init({
    server: "./dist"
  });
});

/* This task will compile .scss to css in dist and afterwards
 * stream changes to browserSync
 */
gulp.task('sass', function() {
  gulp.src('sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream());
});
/* The below tasks will copy html, img assets and js files
 * (if present) to dist folder
 */
gulp.task('html-to-dist', function() {
	gulp.src('./index.html')
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.stream());
});

gulp.task('img-to-dist', function() {
	gulp.src('./img/**/*')
		.pipe(gulp.dest('dist/img'));
});

gulp.task('js-to-dist', function() {
	gulp.src(['js/*'])
		.pipe(babel({
			presets: ['env']
			}))
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.stream());
});

//Default gulp task will run serve task which itself will trigger sass task
gulp.task('default', ['serve']);


//Task for deploying to GitHub Pages
gulp.task('deploy', function () {
  return gulp.src("./dist/**/*")
    .pipe(ghPages())
});
