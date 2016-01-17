
var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpack = require('webpack-stream');
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

gulp.task('default', function() {
  return gulp.src('app/app.js.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('build/'));
});

gulp.task("build-dev", ["webpack:build-dev"], function() {
  gulp.watch(["app/**/*"], ["webpack:build-dev"]);
});