////// HTML  + SASS////////
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compile Sass

gulp.task('sass', function() {
	return gulp.src(['src/scss/*.scss'])
	.pipe(sass())
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.stream());
});

// Watch & Serve

gulp.task('serve', ['sass'], function(){
	browserSync.init({
		server: './src'
	});

	gulp.watch(['src/scss/*.scss'], ['sass']);
	gulp.watch(['src/*.html']).on('change', browserSync.reload);

});

// Default

gulp.task('default', ['serve']);


////// PHP + SASS////////

var gulp = require('gulp'),
    connect = require('gulp-connect-php'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass');
 

// Compile Sass

gulp.task('sass', function() {
  return gulp.src(['src/scss/*.scss'])
  .pipe(sass())
  .pipe(gulp.dest('src/css'))
  .pipe(browserSync.stream());
});
 
gulp.task('connect-sync', ['sass'], function() {
  connect.server({  base: 'src'  },  function (){
    browserSync({     
         proxy: '127.0.0.1:8010'    
        });
  });
 gulp.watch(['src/scss/*.scss'], ['sass']);
  gulp.watch('src/*.php').on('change', function () {
    browserSync.reload();
  });
});

gulp.task('default', ['connect-sync']); 