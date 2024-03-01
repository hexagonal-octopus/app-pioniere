const gulp = require('gulp');

// const compileAll = gulp.series('libs', 'icons', 'compileMarkup', 'compileStyles', 'compileScripts', 'modernizr');

const compileAll = gulp.series('libs', 'icons', 'compileMarkup', 'compileStyles', 'modernizr');

const defaultTask = gulp.series(compileAll, 'watch');

gulp.task('default', defaultTask);