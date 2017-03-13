/*
* @Author: Emmet
* @Date:   2017-03-01 14:24:07
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-12 18:23:10
*/

// gulp只支持es5 如果使用es6先用babel转译
var gulp = require('gulp')
// 页面更改自动刷新模块
var browserSync = require('browser-sync').create()
// 重命名模块
var rename = require('gulp-rename')
// css增加浏览器厂商前缀模块
var autoprefixer = require('gulp-autoprefixer')
// js压缩模块
var uglify = require('gulp-uglify')
// css压缩模块
var minifyCSS = require('gulp-minify-css')
// less编译模块
var less = require('gulp-less')
// js检查模块
// var jshint = require("gulp-jshint")

// 增加厂商前缀
gulp.task('prefix', function () {
  gulp.src('src/css/*.css')
    .pipe(autoprefixer({
      browsers: ['last 2 version', 'Android >= 4.0'],
      cascade: true, // 是否美化属性值 把前缀后的对齐
      remove: true // 是否去掉不必要的前缀 默认true
    }))
    .pipe(gulp.dest('dist/css'))
})
// css压缩
gulp.task('cssmin', function () {
  gulp.src('dist/css/*.css')
    .pipe(minifyCSS())

    .pipe(rename({ // 压缩后的文件改成**.min.css
            suffix: '.min'
        }))
    .pipe(gulp.dest('dist/css'))
})
// js压缩
gulp.task('jsmin', function () {
  gulp.src('src/js/*.js')
    .pipe(uglify().on('error', function(e){ // 遇到错误打印出来
            console.log(e);
         }))
    // {
    //   mangle: true, // 是否修改变量名 默认true
    //   compress: true, // 是否完全压缩
    //   // preserveComments: 'all' // 保留所有注释 默认不保留注释
    // }
    .pipe(rename({ // 压缩后的文件改成**.min.js
            suffix: '.min'
        }))
    .pipe(gulp.dest('dist/js'))
})
// 编译less
gulp.task('less', function () {
    gulp.src('src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('src/css'))
});

//自动刷新
gulp.task('server',function() {

    var files = [
      '**/*.html',
      '**/*.js',
      '**/*.css'
    ]

    // 建立浏览器自动刷新服务器
    browserSync.init(files, {
        server: {
          baseDir: './'
        }
    });

    //监听less
    gulp.watch('src/less/*.less',['less']);
    //自动刷新
    gulp.watch('src/**',function(){
        browserSync.reload();
    })
})

gulp.task('default', ['server'])
