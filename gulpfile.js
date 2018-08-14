var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./views"
        }
    });
    gulp.watch("./views/*.html").on('change', browserSync.reload);
    gulp.watch("./views/style/*.css").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
