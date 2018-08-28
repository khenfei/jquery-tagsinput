const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer'),
  autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
  };
const concat = require('gulp-concat');
const del = require('del');
const sass = require('gulp-sass'),
  sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compressed'
  };
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify-es').default;



const paths = {
  js: ['./src/*.js'],
  jsBuild: './dist/',
  styles: ['./src/*.scss'],
  stylesBuild: './dist/'
}

const buildJsTask = function () {
  return gulp.src(paths.js)
    .pipe(concat('jquery-tagsinput.min.js'))
    .pipe(uglify())
    .on('error', logError)
    .pipe(gulp.dest(paths.jsBuild));
}

const buildStyleTask = function () {
  return gulp.src(paths.styles)
    .pipe(concat('jquery-tagsinput.min.css'))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('./maps'))
    .on('error', logError)
    .pipe(gulp.dest(paths.stylesBuild));
};

const cleanDistFolder = function () {
  return del([paths.jsBuild.concat('*')]);
}

const logError = function (error) {
  console.log(error.toString());
  this.emit('end');
};

gulp.task('build-js', buildJsTask);
gulp.task('build-style', buildStyleTask);
gulp.task('default', gulp.series(cleanDistFolder, gulp.parallel('build-js', 'build-style')));