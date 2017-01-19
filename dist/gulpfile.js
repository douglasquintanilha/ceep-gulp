const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const usemin = require('gulp-usemin');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');





gulp.task("default", function () {
    gulp.start("usemin");
});

gulp.task('clean', function() {
    return gulp.src('dist')
        .pipe(clean());
});


gulp.task("copy",["clean"], function (){
    return gulp.src("./**/*")
                .pipe(gulp.dest("dist"));
});

gulp.task("prefix", ["copy"], function(){
    return gulp.src("dist/css/*.css")
                .pipe(autoprefixer({
                    browsers: ["last 2 versions","IE 10"]
                }))
                .pipe(gulp.dest("css/"));
});

gulp.task('usemin',["prefix"], function() {
  return gulp.src('dist/*.html')
    .pipe(usemin({
        js: [uglify],
        css: [cleanCSS]
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('imagemin',["copy"], function(){
    gulp.src('./img/**/*')
        .pipe(
            imagemin([
               imageminPngquant(),
           ])
       )
        .pipe(gulp.dest('dist/imgs'))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("./**/*").on('change', browserSync.reload);
});
