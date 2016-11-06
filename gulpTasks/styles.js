var gulp = require('gulp'),
del=require('del'),
postcss=require('gulp-postcss'),
cssImport=require('postcss-import');


gulp.task('deleteCSS', function() {
  return del('./client/temp/css');
});

gulp.task('importCSS',['deleteCSS'],function(){
  return gulp.src("./client/assets/css/app.css")
       .pipe(postcss([cssImport]))
       .pipe(gulp.dest("./client/temp/css"));
});
