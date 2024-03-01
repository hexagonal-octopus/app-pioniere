const gulp = require('gulp');
const wait = require('gulp-wait');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const gutil = require('gulp-util');
const autoprefixer = require('gulp-autoprefixer');
const gulpIf = require('gulp-if');

const env = process.env.NODE_ENV;

const compileStyles = () => {
   return gulp.src('./src/assets/scss/**/*.scss')
      .pipe(wait(500))
      .pipe(plumber())
      .pipe(gulpIf(env === 'development', sourcemaps.init()))
      .pipe(sass({
         outputStyle: 'expanded'
      }))
      .on('error', gutil.log.bind(gutil, gutil.colors.red(
         '\n\n*********************************** \n' +
         'SASS ERROR:' +
         '\n*********************************** \n\n'
      )))
      .pipe(autoprefixer({
         browsers: ['last 3 versions'],
         cascade: false
      }))
      .pipe(gulpIf(env === 'development', sourcemaps.write('../maps')))
      .pipe(gulp.dest('./src/temp/styles'))
};
compileStyles.description = 'Compile scss into css';

gulp.task('compileStyles', compileStyles);