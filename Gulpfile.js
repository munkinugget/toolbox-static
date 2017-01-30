var gulp 		= require('gulp'),
    sass 		= require('gulp-sass'),
    connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: '.tmp',
    livereload: true
  });

  gulp.watch('*.html', ['html']);
  gulp.watch('scss/**/*.scss', ['style']);
});

gulp.task('html:watch', function () {
  gulp.src('*.html')
    .pipe(gulp.dest('.tmp/'))
    .pipe(connect.reload());
});

gulp.task('style:watch', function () {
  gulp.src('scss/**/*.scss')
    .pipe(sass({precision: 8}).on('error', sass.logError))
    .pipe(gulp.dest('.tmp/css/'))
    .pipe(connect.reload());
});

//Need a build task for build, deploy?, and dev
gulp.task('dev', ['html:watch', 'style:watch', 'connect']);
//gulp.task('build', ['html', 'style', 'min:image', 'min:js', 'min:hmtl']);
