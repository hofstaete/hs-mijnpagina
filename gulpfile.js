// INCLUDES
//-----------------------------------------------------------//
var gulp 					= require('gulp');
var sass 					= require('gulp-sass');
var sourcemaps 		= require('gulp-sourcemaps');
var autoprefixer 	= require('gulp-autoprefixer');
var uglify 				= require('gulp-uglify');
var sassdoc 			= require('sassdoc');
var browserSync 	= require('browser-sync').create();
// Nog toevoegen: imagemin = require 'gulp-imagemin' 
// pngquant = require 'imagemin-pngquant'

// PATHS
//-----------------------------------------------------------//
var pathSass 							= './scss/{,*/}*.{scss,sass}';
var pathCss 							= './css/';
var pathHtml 							= './*.html';
var pathJs								= './js/';

// OPTIONS
//-----------------------------------------------------------//
var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'expanded'
};
var sassdocOptions = {
	dest: './scss/sassdoc'
};
var autoprefixerOptions = {
	browsers: ['last 3 versions', '> 2%', 'Firefox ESR']
};

// TASKS
//-----------------------------------------------------------//
gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: '.'
		},
		ghostMode: {
		    clicks: true,
		    forms: true,
		    scroll: true
		},
		browser: ["chrome", "firefox", "iexplore"]
	})
})

// For developing, compile sass
gulp.task('sass', function () {
	return gulp
	    .src(pathSass)
	    .pipe(sourcemaps.init())
	    .pipe(sass(sassOptions)
	    	.on('error', sass.logError))
	    .pipe(autoprefixer(autoprefixerOptions))
	    .pipe(sourcemaps.write())
	    .pipe(gulp.dest(pathCss))
	    .pipe(browserSync.reload({
	      stream: true
	    }));
});

// Task to just add sass to sassdoc
gulp.task('sassdoc', function () {
	return gulp
		.src(pathSass)
		.pipe(sassdoc(sassdocOptions))
		.resume();
});

// Watch, handy for developing
gulp.task('watch', ['browserSync', 'sass'], function() {
	    gulp.watch(pathHtml, browserSync.reload) // run task browserSync for html
	    gulp.watch(pathJs, browserSync.reload); // run task browserSync for Js
	    gulp.watch(pathSass, ['sass']) // run task sass
	    gulp.on('change', function(event) {
	      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	    });
});

// For production:  compress all sass + add necessary prefixes, compile to css
gulp.task('prod', ['sassdoc'], function () {
  return gulp
    .src(pathSass)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(pathCss));
});

gulp.task('default', ['sass', 'watch']); 