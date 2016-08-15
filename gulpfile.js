var APP_NAME = 'myzd';
var APP_DOMAIN = '';

var gulp = require('gulp');//gulp构建基础
var cssnano = require('gulp-cssnano');//压缩css
var uglify = require('gulp-uglify');//压缩js
var concat = require('gulp-concat');//合并文件
var sass = require('gulp-sass');//预编译sass
var imageMin = require('gulp-imagemin');//压缩图片
// var rev = require('gulp-rev');//给文件添加md5码
var revCollector = require('gulp-rev-collector');//文件替换路径
var clean = require('gulp-rimraf');//清空文件夹
var minifyHtml = require('gulp-minify-html');//压缩html代码
var connect = require('gulp-connect');//connect服务
var template = require('gulp-template');//静态模板内容替换
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');

var frameworkPaths = {
    jsPath: [
        'framework/js/*.js',
        'framework/js/provider/**/*.js'
    ],
    jsLib: [
		'framework/js/lib/angular.min.js',
        // 'framework/js/lib/angular-animate.js',
        // 'framework/js/lib/angular-cookies.js',
        'framework/js/lib/angular-ui-router.js',
        'framework/js/lib/angular-resource.js'
    ],
    jsDepend: [
    	'framework/js/depend/**/*.js',
    ],
    imagePath: ['framework/images/**/*'],
    cssPath: ['framework/sass/*/*.sass'],//具体引用某些sass文件，在framework.sass中@import
    fontPath: ['framework/sass/font/**/*.*']
};
// var componentsPaths = {
//     jsPath: [
//         'envConfig/**/*.js',
//         'components/components-router.js',
//         'components/common/**/*.js',
//         'components/helper/**/*.js',
//         'components/login/**/*.js',
//         'components/filter/**/*.js'
//     ],
//     cssPath: ['components/components.sass'],//具体引用某些sass文件，在components.sass中@import
//     viewPath: [
//         //template for pop
//         'components/common/**/*.html',
//         'components/helper/**/*.html',
//         'components/login/**/*.html'
//     ],
//     imagePath: []
// };

var appPaths = {
    jsPath: ['app/**/*.js', 'app/main.js'],
    cssPath: ['app/**/*.sass'],//具体引用某些sass文件，在app.sass中@import
    viewPath: ['app/**/*.html'],
    mainPath: ['app/main.html'],
    imagePath: ['app/**/*']
};

// var docPaths = {
//     jsPath: ['doc/js/**/*.js'],
//     cssPath: ['doc/sass/doc.sass'],//具体引用某些sass文件，在app.sass中@import
//     viewPath: ['doc/view/**/*.html'],
//     imagePath: ['doc/images/**/*']
// };

gulp.task('frameworkLib', function () {
    return gulp.src(frameworkPaths.jsLib)
        .pipe(concat('angular.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/framework/js/lib'))
});

gulp.task('frameworkScript', function () {
    return gulp.src(frameworkPaths.jsPath)
        .pipe(uglify())
        .pipe(gulp.dest('dist/framework/js/provider'))
});

gulp.task('frameworkDepend', function () {
    return gulp.src(frameworkPaths.jsDepend)
        .pipe(uglify())
        .pipe(gulp.dest('dist/framework/js/depend/'));
});

gulp.task('frameworkCss', function () {
    return gulp.src(frameworkPaths.cssPath)
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/framework/'))
});

gulp.task('frameworkFont', function () {
    return gulp.src(frameworkPaths.fontPath)
        .pipe(gulp.dest('dist/framework/font/'))
});

gulp.task('frameworkImages', function () {
    return gulp.src(frameworkPaths.imagePath)
        .pipe(imageMin())
        .pipe(gulp.dest('dist/framework/images/'));
});

// gulp.task('componentsScript', function () {
//     return gulp.src(componentsPaths.jsPath)
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/components/'))
// });

// gulp.task('componentsCss', function () {
//     return gulp.src(componentsPaths.cssPath)
//         .pipe(sass())
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions'],
//             cascade: false
//         }))
//         .pipe(cssnano())
//         .pipe(gulp.dest('dist/components/'))
// });

// gulp.task('componentsView', function () {
//     return gulp.src(componentsPaths.viewPath, {base: 'components'})
//         .pipe(gulp.dest('dist/components/'));
// });

// gulp.task('componentsImages', function () {
//     return gulp.src(componentsPaths.imagePath)
//         .pipe(imageMin())
//         .pipe(gulp.dest('dist/components/images/'));
// });

gulp.task('appScript', function () {
    return gulp.src(appPaths.jsPath)
        .pipe(uglify())
        .pipe(gulp.dest('dist/app/'));
});

gulp.task('appCss', function () {
    return gulp.src(appPaths.cssPath)
        .pipe(sass())
        .pipe(cssnano())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/app/'))
});

gulp.task('appView', function () {
    return gulp.src(appPaths.viewPath)
        .pipe(gulp.dest('dist/app/'));
});

gulp.task('appMain', function () {
    return gulp.src(appPaths.mainPath)
        .pipe(gulp.dest('dist/'));
});

gulp.task('appImages', function () {
    return gulp.src(appPaths.imagePath)
        .pipe(imageMin())
        .pipe(gulp.dest('dist/app/images/'));
});

gulp.task('source', function (done) {
	runSequence(
		['frameworkLib'],
		['frameworkScript'],
		['frameworkDepend'],
		['frameworkCss'],
		['frameworkFont'],
		['appScript'],
		['appCss'],
		['appView'],
		['appMain'],
		done
	);
});

gulp.task('image', function (done) {
	runSequence(
		['frameworkImages'],
		['appImages'],
		done
	);
});

//清除文件
gulp.task('clean', function(done) {
	return gulp.src(['dist/', 'rev/', 'temp/'], {read: false})
        .pipe(clean());
});

gulp.task('replaceTemplate', function () {
    return gulp.src(['dist/main.html'])
        .pipe(template({APP_NAME: APP_NAME, APP_DOMAIN: APP_DOMAIN}))
        .pipe(gulp.dest('dist/'));
});

gulp.task('startServer', function () {
    connect.server({
        livereload: true,
        root: './dist',
        port: 30000
    });
});

gulp.task('watchFile', function () {
    gulp.watch(['./app/**/*.*', './framework/**/*.*', './gulpfile.js'], ['build']);
});

//默认任务
gulp.task('build', function(done){
	runSequence(
		['clean'],
		['source'],
		// ['image'],
		['replaceTemplate'],
		done
	);
});

gulp.task('dev', function(done) {
	runSequence(
		['build'], //编译项目
		['startServer'], //起服务器
		['watchFile'], //热检查项目并loop
		done
	);
});