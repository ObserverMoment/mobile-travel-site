var gulp = require('gulp'),
    watch = require('gulp-watch'),
    // Browser sync allows instant update of changes without refreshing page. It also allows for you to have multiple browsers open at once. All will mirror each other.
    // This can make cross browser testing much easier.
    browserSync = require('browser-sync').create();

    // Other Browser Sync Notes: Re. Mobile testing.
    // Local: http://localhost:3000
    // External: http://192.168.1.80:3000 ===== If you enter this into your mobile phone browser then it will also update your changes on there. Making mobile testing much easier than usual.
    // -------------------------------------
    // UI: http://localhost:3001
    // UI External: http://192.168.1.80:3001

gulp.task('watch', function() {

  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });

  watch('./app/index.html', function() {
    browserSync.reload();
  });

  watch('./app/assets/css/**/*.css', function() {
    gulp.start('cssAutoInject');
  });
});

// The second arg to this function is for dependencies - these tasks must be run before the main function.
gulp.task('cssAutoInject', ['styles'], function() {
  return gulp.src('.app/dist/css/styles.css')
        .pipe(browserSync.stream());
});
