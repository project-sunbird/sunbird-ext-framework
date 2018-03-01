var gulp = require("gulp");
var NPMinstall = require('gulp-install');
var rename = require("gulp-rename");

var source = [{
    src: '../../web/dist/**/*',
    name: 'web-framework'
},{
    src: '../plugins/profile/web/dist/**/*',
    name: 'profile'
}]
    

gulp.task('loadWebDep', function () {
    for(var dep of source) {
        gulp.src([dep.src])
        .pipe(gulp.dest('./node_modules/'))
    }
});