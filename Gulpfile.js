const gulp = require('gulp');
const babel = require('gulp-babel');
const minify = require('gulp-minify');
const jslint = require('gulp-jslint');
 
gulp.task('default', function(){
	return gulp.src('src/animationFrameController.js').pipe(babel({
		presets: ['es2015']
	})).pipe(minify({
		ext: { min: '.min.js' }
	})).pipe( gulp.dest('build') ).pipe(jslint()) .pipe(
		jslint.reporter('stylish')
	);
});