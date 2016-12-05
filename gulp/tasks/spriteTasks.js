var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename');

var config = {
  mode: {
    css: {
      sprite: 'sprite.svg',
      render: {
        css: {
          // This is where the moustache template is located. This template will generate a class for each individual sprite based on the sprite sheet.
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
}

gulp.task('createSprite', function() {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/dist/sprite'));
});

gulp.task('copySpriteSVG', ['createSprite'], function() {
  return gulp.src('./app/dist/sprite/css/**/*.svg')
    .pipe(gulp.dest('./app/assets/images/sprites'));
});

// The second argument in square brackets is dependencies. This means that the task will not run until the dependencies are fulfilled.
gulp.task('copySpriteCSS', ['createSprite'], function() {
  return gulp.src('./app/dist/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/css/modules'));
});

// This will run both the tasks in square brackets.
gulp.task('icons', ['createSprite', 'copySpriteSVG', 'copySpriteCSS']);
