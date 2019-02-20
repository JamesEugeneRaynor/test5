var gulp = require('gulp');
var watch = require('gulp-watch');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var cssimport = require('postcss-import');
var sync = require('browser-sync').create();


gulp.task('default', function() {
  console.log('defaultni gulp task');
});

gulp.task('html', function() {
console.log('imagine something');
});


gulp.task('watch', function() {

  // tohle nastaví lokální server, který spustí index.html v adresáři app
  sync.init({
    server: {
      baseDir: "app"
    }
  })

  watch('./app/index.html', function() {
      console.log('html changed - yay!');
      sync.reload();
    });

  watch('./app/styles/**/*.css', function() {
      console.log('css changed, yay!');
      return gulp.src('./app/styles/styles.css')
        .pipe(postcss([cssimport, nested, cssvars, autoprefixer]))
        .pipe(gulp.dest('./app/temp/styles'));
        }); 
  });

  gulp.task('cssInject', function() {
    return gulp.src('./app/temp/styles/styles.css')
      .pipe(sync.stream());
  });