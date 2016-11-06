var gulp = require('gulp'),
del=require('del'),
webpack = require('webpack');

gulp.task('js',['deleteJS'], function(callback) {
  webpack(require('./webpack.config.js'), function(err, stats) {
    if (err) {
      console.log(err.toString());
    }
    console.log(stats.toString());
    callback();
  });
});

gulp.task('deleteJS', function() {
  return del('./client/temp/js');
});
