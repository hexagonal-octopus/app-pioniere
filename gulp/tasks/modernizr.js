const gulp = require('gulp'),
modernizr = require('gulp-modernizr');

const createModernizr = () => {
   return gulp.src(['./src/temp/styles/**/*.css', './src/assets/scripts/**/*.js'])
      .pipe(modernizr({
         "options": [
            "setClasses"
         ]
      }))
      .pipe(gulp.dest('./src/temp/scripts'));
};
createModernizr.description = 'Create Modernizr Files';

const moveModernizr = () => {
   return gulp.src('./src/temp/scripts/modernizr.js')
   .pipe(gulp.dest('./src/assets/scripts/modernizr'));
};
moveModernizr.description = 'Moving Modernizr into assets scripts folder';

const doModernizr = gulp.series(createModernizr, moveModernizr);

gulp.task('modernizr', doModernizr);