'use strict';

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var critical = require('critical');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var del = require('del');
var print = require('gulp-print');
//var fs = require('fs');
//var fs = require('vinyl-fs');
var source = require('vinyl-source-stream')

var WIDTH = 600;
var HEIGHT = 800;

var request = require('request');



gulp.task('download-font', function () {
    return request('http://fonts.googleapis.com/css?family=Open+Sans:400,700')
        .pipe(source('font_googleapis_com_open_sans_400_700.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('css'))
});



gulp.task("critical-index-1", function() {

    gulp.scr('index.html')
        .pipe(
        critical.generate({
            base: './',
            dest: 'dist/critical/css/critical-index.css',
            minify: true,
            extract: true,
            width: WIDTH,
            height: HEIGHT
        }));

    pipe(critical.inline({
        base: './',
        src: 'index.html',
        dest: 'dist/critical/index.html',
        minify: true
    }));
});



//
// Minify CSS
// Inline CSS for above-the-fold content
// There a 4 tasks for 4 files because the inline CSS can be different for every html file.
//
gulp.task("critical-index", function() {
    critical.generate({
        base: './',
        src: './index.html',
        dest: 'dist/critical/css/critical-index.css',
        minify: true,
        extract: true,
        width: WIDTH,
        height: HEIGHT
    });

    critical.inline({
        base: './',
        src: 'index.html',
        dest: 'dist/critical/index.html',
        minify: true
    });
});


gulp.task("critical-project-2048", function() {
    critical.generate({
        base: './',
        src: './project-2048.html',
        dest: 'dist/critical/css/critical-project-2048.css',
        minify: true,
        extract: true,
        width: 1200,
        height: 800
    });

    critical.inline({
        base: './',
        src: 'project-2048.html',
        dest: 'dist/critical/project-2048.html',
        minify: true
    });
});


gulp.task("critical-project-mobile", function() {
    critical.generate({
        base: './',
        src: './project-mobile.html',
        dest: 'dist/critical/css/project-mobile.css',
        minify: true,
        extract: true,
        width: 1200,
        height: 800
    });

    critical.inline({
        base: './',
        src: 'project-mobile.html',
        dest: 'dist/critical/project-mobile.html',
        minify: true
    });
});


gulp.task("critical-project-webperf", function() {
    critical.generate({
        base: './',
        src: './project-webperf.html',
        dest: 'dist/critical/css/project-webperf.css',
        minify: true,
        extract: true,
        width: 1200,
        height: 800
    });

    critical.inline({
        base: './',
        src: 'project-webperf.html',
        dest: 'dist/critical/project-webperf.html',
        minify: true
    });
});


//
// Minify HTML
//
gulp.task('html', function() {
    return gulp.src('dist/critical/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest("./dist"))
});


//
// Optimize Images
//
gulp.task('imagemin', function() {

    return gulp.src('img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img'));

});


//
// Minify JavaScript
//
gulp.task('compress', function() {
    return gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

//
// Minify CSS
//
gulp.task('minify-css', function () {
    return gulp.src('css/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/css'));
});


//
// views
//

gulp.task('imagemin1', function() {

    return gulp.src('views/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/views/images'));
});



gulp.task('clean', function (cb) {
    del([
        'dist/critical/*.html',
        'dist/critical/css/*',
        'dist/css/*.css',
        'dist/img/*',
        'dist/js/*',
        'dist/*.html',
        'dist/*.gzip',
    ], cb);
});




function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

// ['critical-index', 'critical-project-2048', 'project-mobile', 'project-webperf']
gulp.task('build', function(done) {
    //runSequence('clean');
    //runSequence('critical-index', 'critical-project-2048', 'critical-project-mobile', 'critical-project-webperf');
    runSequence(
        'clean',
        ['download-font'],
        ['critical-index', 'critical-project-2048', 'critical-project-mobile', 'critical-project-webperf'],
        ['imagemin', 'compress', 'minify-css'],
        'html', done);
});





gulp.task('default', ['build']);


