// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var slim = require("gulp-slim");
//var sass = require('./node_modules/gulp-sass');


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


// Compile Our Sass
//gulp.task('sass', function() {
//    return gulp.src('./sass/*.scss')
//        .pipe(sass())
//        .pipe(gulp.dest('css'));
//});

// Watch Files For Changes
gulp.task('watch', function() {
    //gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./slim/*.slim', ['slim']);
});

// Default Task
gulp.task('default', [/* 'sass',*/ 'slim', 'watch']);

