const gulp = require('gulp');
const dateFilter = require('nunjucks-date-filter');
const plumber = require('gulp-plumber');
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data');
const del = require('del');

const manageEnvironment = function(env) {
   env.addFilter('date', dateFilter);
};

const createMarkup = () => {
   return gulp.src('./src/templates/pages/**/*.njk')
      .pipe(plumber())
      .pipe(data(function() {
         return require('../../data/data.json')
      }))
      .pipe(nunjucksRender({ 
         path: ['./src/templates'],
         manageEnv: manageEnvironment
      }))
      .pipe(gulp.dest('./src'));
};
createMarkup.description = 'Create HTML from Nunjucks';

const deleteOldMarkup = () => {
   return del('./src/**/*.html'); 
};
deleteOldMarkup.description = 'delete obsolete HTML from Nunjucks';

const compileMarkup = gulp.series(deleteOldMarkup, createMarkup);

gulp.task('compileMarkup', compileMarkup);