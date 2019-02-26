var gulp = require('gulp');
var watch = require('gulp-watch');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var cssimport = require('postcss-import');
var sync = require('browser-sync').create();
var mixins = require('postcss-mixins');

//tohle musi pryc

gulp.task('default', function() {
  console.log('defaultni gulp task');
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
      // kontrolní hláška
      console.log('css chnged, yay!');
      // vezmi tenhle css soubor
      gulp.src('./app/styles/styles.css')
      // protahni ho timhle postcss - popasuj se s vecma jako: import, nested css, css promene, autoprefixer
        .pipe(postcss([mixins, cssimport, nested, cssvars, autoprefixer]))
      // nezpanikar, kdyz se pripadne objevi nejaka chyba
        .on('error', function(chybka) {
          console.log(chybka.toString());
          this.emit('end');
        })
      // a uloz to cssko sem
        .pipe(gulp.dest('./app/temp/styles')); 

      // vem to cssko a automaticky ho promitni do prohlizece  
      return gulp.src('./app/temp/styles/styles.css')
          .pipe(sync.stream());
        }); 
        
  });

  