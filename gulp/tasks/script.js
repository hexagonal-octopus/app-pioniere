// var gulp              = require('gulp');
// var plumber           = require('gulp-plumber');
// var jshint            = require('gulp-jshint');

// gulp.task('script', function(){
//    return gulp.src('src/js/*.js')
//    .pipe(plumber())
//    .pipe(jshint()) 
//    .pipe(jshint.reporter('jshint-stylish'))
//    .pipe(jshint.reporter('fail'))
//    .pipe(gulp.dest('public/assets/js/'))
// });

const gulp = require('gulp'),
webpack = require('webpack'),
uglify = require('gulp-uglify');

const convertWebpack = (callback) => {
   webpack(require('../../webpack.config.js'), function(err, stats) {
      if(err){
         console.log(err.toString())
      }

      console.log(stats.toString());
      callback();
   });
};

gulp.task('compileScripts', convertWebpack);
