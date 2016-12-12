var gulp = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),
    rename = require('gulp-rename'),
    del = require('del');

var config = {
  mode: {
    css: {
      sprite: 'sprite.svg',
      render: {
        css: {
          // This is where the moustache template is located. This template will generate a css class for each individual sprite based on the sprite sheet.
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
}

// A task to clear previous verions of sprite files before creating more.
gulp.task('beginClean', function() {
  return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

gulp.task('createSprite', ['beginClean'], function() {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'));
});

gulp.task('copySpriteSVG', ['createSprite'], function() {
  return gulp.src('./app/temp/sprite/css/**/*.svg')
    .pipe(gulp.dest('./app/assets/images/sprites'));
});

// The second argument in square brackets is dependencies. This means that the task will not run until the dependencies are fulfilled.
gulp.task('copySpriteCSS', ['createSprite'], function() {
  return gulp.src('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/css/modules'));
});

// A task to clear any temp files created during the process.
gulp.task('endClean', ['copySpriteSVG', 'copySpriteCSS'], function() {
  return del(['./app/temp/sprite']);
});

// This will run all the tasks in square brackets.
gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteSVG', 'copySpriteCSS', 'endClean']);
