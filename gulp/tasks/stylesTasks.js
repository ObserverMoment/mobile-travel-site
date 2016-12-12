var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
cssimport = require('postcss-import'),
nested = require('postcss-nested'),
mixins = require('postcss-mixins');

gulp.task('styles', function() {
  return gulp.src('./app/assets/css/styles.css')
        .pipe(postcss([cssimport, mixins, nested, cssvars, autoprefixer]))
        // This will stop gulp from quiting when an error is triggered within the css files.
        .on('error', function(errorInfo) {
          console.log(errorInfo.toString());
          this.emit('end');
        })
        .pipe(gulp.dest('./app/temp/css'));
});
