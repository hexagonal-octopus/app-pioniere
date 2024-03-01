const gulp = require('gulp');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();

const htmlRefresh = () => {
   return gulp.src('./src/**/*.html')
      .pipe(browserSync.stream());
};

const cssInject = () => {
   gulp.src('./src/temp/styles/*.css')
      .pipe(browserSync.stream());
};

const scriptsRefresh = (done) => {
   browserSync.reload();
   done();
};

const watchMarkup = gulp.series('compileMarkup', htmlRefresh);
const watchStyles = gulp.series('compileStyles', cssInject);
// const watchScripts = gulp.series('compileScripts', scriptsRefresh);

const watchAll = () => {
   browserSync.init({
      port: 9000,
      server:{
         baseDir: "src"
      }
   });

   watch('./src/templates/**/*.njk', gulp.series(watchMarkup));
   watch('./src/assets/scss/**/*.scss', gulp.series(watchStyles));
   watch('./src/assets/scripts/**/*.js', gulp.series(scriptsRefresh));
   // Watch Webpack
   // watch(['./src/assets/scripts/**/*.js', '!./src/assets/scripts/components/**/*.js'], gulp.series(watchScripts));
}

gulp.task('watch', watchAll);

// gulp.task('watch', function() {
//    watch('./src/templates/**/*.njk', gulp.series('htmlRefresh'));
//    watch('./src/assets/scss/**/*.scss', gulp.series('cssInject'));
//    watch('./src/assets/scripts/**/*.js', gulp.series('scriptsRefresh'));
// });