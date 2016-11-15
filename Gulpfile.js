const gulp = require('gulp');
const babel = require('gulp-babel');
 
gulp.task('default', function(){
	return gulp.src('src/animationFrameController.js').pipe(babel({
		presets: ['es2015']
	})).pipe( gulp.dest('build') );
});