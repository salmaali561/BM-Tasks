const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// Compile SCSS into CSS
function compileSass() {
  return gulp.src('scss/myFW.scss') // Source file
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css')); // Destination folder
}

// Watch SCSS files for changes
function watchSass() {
  gulp.watch('scss/**/*.scss', compileSass);
}

// Default Gulp task
exports.default = gulp.series(compileSass, watchSass);
