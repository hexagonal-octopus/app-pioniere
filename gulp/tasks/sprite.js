const gulp             = require('gulp');
const plumber          = require('gulp-plumber');
const svgsprite        = require('gulp-svg-sprite');
const rename           = require('gulp-rename');
const svg2png          = require('gulp-svg2png');
const del              = require('del');

const configSprite = {
   shape: {
      padding: 1
   },
   mode: {
      css: {
         variables: {
            replaceSVGtoPNG: function() {
               return function(sprite, render) {
                  return render(sprite).split('.svg').join('.png');
               }
            }
         },
         sprite: 'sprite.svg',
         bust: false,
         render: {
            scss: {
               template: './gulp/templates/sprites.html'
            }
         }
      }
   }
};

const configSymbol = {
   mode: {
     symbol : true
   }
};

const initialClean = () => {
   return del(['./src/temp/sprites', './src/assets/images/sprites'])
};
 
const createSprite = () => {
   return gulp.src('./src/assets/svg/**/*.svg')
   .pipe(plumber())
   .pipe(svgsprite(configSprite))
   // .pipe(rename('sprites.svg'))
   .pipe(gulp.dest('./src/temp/sprites'));
};

const createPNGSprite = () => {
   return gulp.src('./src/temp/sprites/css/*.svg')
      .pipe(svg2png())
      .pipe(gulp.dest('./src/temp/sprites/css'))
};

const copySpriteStyle = () => {
   return gulp.src('./src/temp/sprites/**/*.scss')
   .pipe(rename('_sprites.scss'))
   .pipe(gulp.dest('./src/assets/scss/ui'));
};

const copySpriteGraphic = () => {
   return gulp.src('./src/temp/sprites/css/*.{svg,png}')
   .pipe(gulp.dest('./src/assets/images/sprites'));
};

const afterClean = () => {
   return del('./src/temp/sprites');
};

const icons = gulp.series(initialClean, createSprite, createPNGSprite, copySpriteStyle, copySpriteGraphic, afterClean)

gulp.task('icons', icons);