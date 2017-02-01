var gulp 		     = require('gulp'),
    sass 		     = require('gulp-sass'),
    connect      = require('gulp-connect'),
    htmlmin      = require('gulp-htmlmin'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin     = require('gulp-imagemin');

gulp.task('default', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

var settings = {
    glob: {
      js: 'src/**/*.html',
      html: '/**/*.html',
      images: 'images/**/*',
      styles: 'scss/**/*.scss'
    },
    dist: {
      root: '.tmp/',
      js: '.tmp/js/',
      html: '.tmp/',
      images: '.tmp/images/',
      styles: '.tmp/css/'
    }
  };

gulp.task('connect', function() {
  connect.server({
    root: settings.dist.root,
    livereload: true
  });

  gulp.watch(settings.glob.html, ['html:dev']);
  gulp.watch(settings.glob.js, ['js:dev']);
  gulp.watch(settings.glob.styles, ['style:dev']);
});

gulp.task('html:dev', function() {
  gulp.src(settings.glob.html)
    .pipe(gulp.dest(settings.dist.html))
    .pipe(connect.reload());
});

gulp.task('html:build', function() {
  gulp.src(settings.glob.html)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(settings.dist.html));
});

gulp.task('images:dev', function() {
  gulp.src(settings.glob.images)
    .pipe(gulp.dest(settings.dist.images))
    .pipe(connect.reload());
});

gulp.task('images:build', function() {
  gulp.src(settings.glob.images)
    .pipe(imagemin())
    .pipe(gulp.dest(settings.dist.images));
});

gulp.task('style:dev', function() {
  gulp.src(settings.glob.styles)
    .pipe(sass({precision: 8}).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest(settings.dist.styles))
    .pipe(connect.reload());
});

gulp.task('style:build', function() {
  gulp.src(settings.glob.styles)
    .pipe(sass({precision: 8}).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest(settings.dist.styles));
});

gulp.task('js:dev', function() {
  gulp.src(settings.glob.js)
    .pipe(gulp.dest(settings.dist.js))
    .pipe(connect.reload());
});

gulp.task('js:build', function() {
  gulp.src(settings.glob.js)
    .pipe(gulp.dest(settings.dist.js));
});

//Need a build task for build, deploy?, and dev
gulp.task('dev', ['html:dev', 'images:dev', 'js:dev', 'style:dev', 'connect']);
gulp.task('build', ['html:build', 'images:build', 'js:build', 'style:build']);
