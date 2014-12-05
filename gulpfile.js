var gulp = require('gulp'),
  gulpLoadPlugins = require('gulp-load-plugins'),
  plugins = gulpLoadPlugins(),
  path = {
    html: ['app/**/*.html', 'app/**/*.ttf', 'app/**/*.png'],
    scripts: ['app/**/*.js'],
    scss: ['app/**/*.scss', '!app/library/**/*.scss'],
    less: ['app/**/*.less', '!app/library/**/*.less'],
    css: 'app/**/*/documentation/**/*.css',
    images: 'app/**/*.png'
  },
  options = {
    branch: "gh-pages"
  };
gulp.task('default', ['install', 'build', 'serve', 'watch']);

gulp.task('build', ['copyJS', 'copyHTML', 'sassToCSS']);

gulp.task('compress', function () {
  gulp.src(path.scripts)
    .pipe(plugins.uglify())
    .pipe(plugins.concat('all.min.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('copyJS', function () {
  gulp.src(path.scripts)
    .pipe(gulp.dest('.temp'));
});

gulp.task('copyHTML', function () {
  gulp.src(path.html)
    .pipe(gulp.dest('.temp'));
});

gulp.task("sassToCSS", function () {
  var s = plugins.sass({});
  s.on('error', function (e) {
    console.log(e);
    s.end();
  });
  gulp.src(path.scss)
    .pipe(s)
    .pipe(gulp.dest('.temp'));
});

gulp.task("documentation", function () {
  gulp.src(path.scripts)
    .pipe(plugins.jsdoc('build/documentation'));
});

gulp.task('install', function () {
  gulp.src(['./bower.json', './package.json'])
    .pipe(plugins.install());
});

gulp.task('serve', function () {
  plugins.connect.server({
    port: 9000,
    root: '.temp'
  });
});

// Rerun the task when a file changes
gulp.task('watch', function () {
  gulp.watch(path.scripts, ['copyJS']);
  gulp.watch(path.html, ['copyHTML']);
  gulp.watch(path.scss, ['sassToCSS']);
});


/**
 * Push build to gh-pages
 */
gulp.task('deploy', function () {
  return gulp.src("./.temp/**/*")
    .pipe(plugins.gh-pages(options))
});

