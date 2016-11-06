var gulp = require('gulp'),
watch=require('gulp-watch'),
browserSync=require('browser-sync').create();


gulp.task('watch', function() {

  browserSync.init({
     server:{
       baseDir:'client'
     }
  });

  watch('./client/index.html',function(){
    browserSync.reload();
  });

  watch(['./client/assets/css/**/*.css'],function(){
    gulp.start('cssInject');
  });

  watch('./client/assets/js/**/*.js', function() {
    gulp.start('refreshJS');
  });

});

gulp.task('cssInject',['importCSS'],function(){
    return gulp.src('./client/temp/css/app.css')
           .pipe(browserSync.stream());
});


gulp.task('refreshJS', ['js'], function() {
  browserSync.reload();
});
