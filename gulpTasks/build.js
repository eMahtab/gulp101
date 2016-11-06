var gulp = require('gulp'),
del=require('del'),
imagemin=require('gulp-imagemin'),
usemin=require('gulp-usemin'),
cssnano=require('gulp-cssnano'),
uglify=require('gulp-uglify'),
rev=require('gulp-rev'),
browserSync=require('browser-sync').create();

gulp.task('usemin',['deleteDistFolder'],function(){
   return gulp.src('./client/index.html')
              .pipe(usemin({
                css:[function(){return rev()},function(){return cssnano( {discardComments: {removeAll: true}} )}],
                js:[function(){return rev()},function(){return uglify()}]
              }))
              .pipe(gulp.dest('./client/dist'))
});

gulp.task('deleteDistFolder', function() {
  return del("./client/dist");
});

gulp.task('copyOtherFiles', ['deleteDistFolder'], function() {
  return gulp.src(['./client/data/**/*'])
        .pipe(gulp.dest("./client/dist/data"));
});


gulp.task('compressImages', ['deleteDistFolder'], function() {
  return gulp.src(['./client/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulp.dest("./client/dist/assets/images"));
});

gulp.task('build',['compressImages','deleteDistFolder','copyOtherFiles','usemin']);

gulp.task('previewDist',function() {
  browserSync.init({
     server:{
       baseDir:'./client/dist'
     }
  });
});
