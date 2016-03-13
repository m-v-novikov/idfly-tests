// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var slim = require("gulp-slim");
//var jshint = require('./node_modules/gulp-jshint');
//var sass = require('./node_modules/gulp-sass');
//var concat = require('./node_modules/gulp-concat');
//var uglify = require('./node_modules/gulp-uglify');
//var rename = require('./node_modules/gulp-rename');

console.log(
    slim({
        compile: true
    })
)

//Slim Task
gulp.task('slim', function(){
    return gulp.src("./slim/index1.slim")
        .pipe(slim({
            compile: true
        }))
        .pipe(gulp.dest("./html/"));
});

// Lint Task
//gulp.task('lint', function() {
//    return gulp.src('./app/js/*.js')
//        .pipe(jshint())
//        .pipe(jshint.reporter('default'));
//});

// Compile Our Sass
//gulp.task('sass', function() {
//    return gulp.src('./sass/*.scss')
//        .pipe(sass())
//        .pipe(gulp.dest('css'));
//});

// Concatenate & Minify JS
//gulp.task('scripts', function() {
//    return gulp.src('./app/js/*.js')
//        .pipe(concat('all.js'))
//        .pipe(gulp.dest('dist'))
//        .pipe(rename('all.min.js'))
//        .pipe(uglify())
//        .pipe(gulp.dest('dist'));
//});

// Watch Files For Changes
gulp.task('watch', function() {
    //gulp.watch('./app/js/**/*.js', ['lint', 'scripts']);
    //gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./slim/*.slim', ['slim']);
});

// Default Task
gulp.task('default', [/*'lint', 'sass',*/ /*'scripts', */'slim', 'watch']);

