const gulp = require('gulp')
path = require('path'),
del = require('del'),
npmDist = require('gulp-npm-dist'),
rename = require('gulp-rename');

// Gulp 3.9
// gulp.task('cleanLibs', function() {
//    return del('./src/assets/libs')
// })

const cleanLibs = () => {
   return del('./src/assets/libs');
};
cleanLibs.description = 'initial clean libs folder';

const importLibs = () => {
   return gulp.src(npmDist({
     copyUnminified: true,
     excludes: ['**/*.txt', 'test', 'lib', 'docs', 'source', '*.json', '**/*.zip', 'src'] 
   }), {base: './node_modules/'})
      .pipe(rename(function(path) {
         path.dirname = path.dirname.replace(/\/dist/, '').replace(/\\dist/, '');
      }))
      .pipe(gulp.dest('./src/assets/libs'));
};
importLibs.description = 'importing library from node_modules';

const distributeFontLibs = () => {
  return gulp.src('./src/assets/libs/**/*.{ttf,woff,woff2,eot,otf}')
    .pipe(gulp.dest('./src/assets/fonts'));
}

const distributeJSLibs = () => {
  return gulp.src('./src/assets/libs/**/*.js')
    .pipe(gulp.dest('./src/assets/scripts'));
}

const distributeImageLibs = () => {
  return gulp.src('./src/assets/libs/**/*.{jpg,png,gif}')
    .pipe(gulp.dest('./src/assets/images/default'));
}

const distributeStyleLibs = () => {
  return gulp.src('./src/assets/libs/**/*.css')
    .pipe(gulp.dest('./src/assets/styles'));
}

const distributeAssetLibs = gulp.parallel(distributeFontLibs, distributeImageLibs, distributeStyleLibs, distributeJSLibs);

const cleanAfterLibs = () => del('./src/assets/libs');

const libs = gulp.series(cleanLibs, importLibs, distributeAssetLibs, cleanAfterLibs);

gulp.task('libs', libs);
