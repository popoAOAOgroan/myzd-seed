//this should
var APP_NAME = 'h5';
var APP_DOMAIN = 'http://m.1yd.me';

var gulp = require('gulp');//gulp构建基础

var cssnano = require('gulp-cssnano');//压缩css
var uglify = require('gulp-uglify');//压缩js
var concat = require('gulp-concat');//合并文件
var sass = require('gulp-sass');//预编译sass
var imageMin = require('gulp-imagemin');//压缩图片
var rev = require('gulp-rev');//给文件添加md5码
var revCollector = require('gulp-rev-collector');//文件替换路径
var clean = require('gulp-rimraf');//清空文件夹
var minifyHtml = require('gulp-minify-html');//压缩html代码
var connect = require('gulp-connect');//connect服务
var template = require('gulp-template');//静态模板内容替换

var frameworkPaths = {
    jsPath: ['framework/js/lib/angular.min.js',
        'framework/js/lib/angular-animate.js',
        'framework/js/lib/angular-cookies.js',
        'framework/js/lib/angular-ui-router.js',
        'framework/js/lib/angular-resource.js',
        'framework/js/depend/**/*.js',
        'framework/js/*.js',
        'framework/js/provider/**/*.js',
        'framework/js/service/**/*.js'
    ],
    imagePath: ['framework/images/**/*'],
    cssPath: ['framework/sass/framework.sass'],//具体引用某些sass文件，在framework.sass中@import
    dependPath: ['framework/js/depend/**/*.js', 'framework/js/lib/**/*.js', 'framework/js/provider/localStorage/**/*.js', 'envConfig/**/*.js'],
    fontPath: ['framework/sass/font/**/*.*']
};
var componentsPaths = {
    jsPath: [
        'envConfig/**/*.js',
        'components/components-router.js',
        'components/common/**/*.js',
        'components/helper/**/*.js',
        'components/login/**/*.js',
        'components/filter/**/*.js'
    ],
    cssPath: ['components/components.sass'],//具体引用某些sass文件，在components.sass中@import
    viewPath: [
        //template for pop
        'components/common/**/*.html',
        'components/helper/**/*.html',
        'components/login/**/*.html'
    ],
    imagePath: []
};
var appPaths = {
    jsPath: ['app/js/**/*.js'
    ],
    cssPath: ['app/sass/app.sass'],//具体引用某些sass文件，在app.sass中@import
    viewPath: ['app/view/**/*.html'],
    imagePath: ['app/images/**/*']
};
var docPaths = {
    jsPath: ['doc/js/**/*.js'],
    cssPath: ['doc/sass/doc.sass'],//具体引用某些sass文件，在app.sass中@import
    viewPath: ['doc/view/**/*.html'],
    imagePath: ['doc/images/**/*']
};
/**
 * 清除当前目录
 */
gulp.task('clean', function (callback) {
    // You can use multiple globbing patterns as you would with `gulp.src`
    return gulp.src(['dist/', 'rev/', 'temp/'], {read: false})
        .pipe(clean());
});

/**
 * 合并framework.js
 */
gulp.task('frameworkScript', function () {
    return gulp.src(frameworkPaths.jsPath)
        //.pipe(jshint())
        //.pipe(jshint.reporter())
        .pipe(concat('framework.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('dist/framework/'))
        .pipe(rev.manifest())//- 生成一个rev-manifest.json
        .pipe(rev())
        .pipe(gulp.dest('rev/'));
});
/**
 *
 */
gulp.task('frameworkDepend', function () {
    return gulp.src(frameworkPaths.dependPath)
        .pipe(uglify())
        .pipe(gulp.dest('dist/depend/'));
});
/**
 * 合并framework.css
 */
gulp.task('frameworkCss', function () {
    return gulp.src(frameworkPaths.cssPath)
        .pipe(sass())
        .pipe(cssnano())
        .pipe(concat('framework.css'))
        .pipe(rev())
        .pipe(gulp.dest('dist/framework/'))
        .pipe(rev.manifest())//- 生成一个rev-manifest.json
        .pipe(rev())
        .pipe(gulp.dest('rev/'));
});
gulp.task('frameworkFont', function () {
    return gulp.src(frameworkPaths.fontPath)
        .pipe(gulp.dest('dist/framework/font/'))
});
/**
 * 合并components.js
 */
gulp.task('componentsScript', function () {
    return gulp.src(componentsPaths.jsPath)
        .pipe(concat('components.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('dist/components/'))
        .pipe(rev.manifest())
        .pipe(rev())
        .pipe(gulp.dest('rev/'));
});
/**
 * 合并components.css
 */
gulp.task('componentsCss', function () {
    return gulp.src(componentsPaths.cssPath)
        .pipe(sass())
        .pipe(cssnano())
        .pipe(concat('components.css'))
        .pipe(rev())
        .pipe(gulp.dest('dist/components/'))
        .pipe(rev.manifest())
        .pipe(rev())
        .pipe(gulp.dest('rev/'));
});
/**
 * 合并components, view
 */
gulp.task('componentsView', function () {
    return gulp.src(componentsPaths.viewPath, {base: 'components'})
        .pipe(gulp.dest('dist/components/'));
});
/**
 * 合并app.js
 */
gulp.task('appScript', function () {
    return gulp.src(appPaths.jsPath)
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('dist/app/'))
        .pipe(rev.manifest())
        .pipe(rev())
        .pipe(gulp.dest('rev/'));
});
/**
 * 合并app.css
 */
gulp.task('appCss', function () {
    return gulp.src(appPaths.cssPath)
        .pipe(sass())
        .pipe(cssnano())
        .pipe(concat('app.css'))
        .pipe(rev())
        .pipe(gulp.dest('dist/app/'))
        .pipe(rev.manifest())
        .pipe(rev())
        .pipe(gulp.dest('rev/'));
});
/**
 * 合并app, view
 */
gulp.task('appView', function () {
    return gulp.src(appPaths.viewPath)
        .pipe(gulp.dest('dist/app/view/'));
});
/**
 * 合并doc.js
 */
gulp.task('docScript', function () {
    return gulp.src(docPaths.jsPath)
        .pipe(concat('doc.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('dist/doc/'))
        .pipe(rev.manifest())
        .pipe(rev())
        .pipe(gulp.dest('rev/doc/'));
});
/**
 * 合并doc.css
 */
gulp.task('docCss', function () {
    return gulp.src(docPaths.cssPath)
        .pipe(sass())
        .pipe(cssnano())
        .pipe(concat('doc.css'))
        .pipe(rev())
        .pipe(gulp.dest('dist/doc/'))
        .pipe(rev.manifest())
        .pipe(rev())
        .pipe(gulp.dest('rev/doc/'));
});
/**
 * 合并doc, view
 */
gulp.task('docView', function () {
    return gulp.src(docPaths.viewPath)
        .pipe(gulp.dest('dist/doc/view/'));
});
gulp.task('frameworkImages', function () {
    return gulp.src(frameworkPaths.imagePath)
        .pipe(imageMin())
        .pipe(gulp.dest('dist/framework/images/'));
});
gulp.task('componentsImages', function () {
    return gulp.src(componentsPaths.imagePath)
        .pipe(imageMin())
        .pipe(gulp.dest('dist/components/images/'));
});
gulp.task('appImages', function () {
    return gulp.src(appPaths.imagePath)
        .pipe(imageMin())
        .pipe(gulp.dest('dist/app/images/'));
});
gulp.task('docImages', function () {
    return gulp.src(docPaths.imagePath)
        .pipe(imageMin())
        .pipe(gulp.dest('dist/doc/images/'));
});

/**
 * 编译源js/css文件
 */
gulp.task('source', ['frameworkScript', 'frameworkDepend', 'frameworkCss', 'frameworkFont',  'appScript', 'appCss', 'appView'], function () {
});
//编译images文件
gulp.task('image', ['frameworkImages', 'appImages'], function () {
});
/**
 * 编译源doc的js/css文件
 */
gulp.task('docSource', ['docScript', 'docCss', 'docView'], function () {
});
//编译images文件
gulp.task('docImage', ['docImages'], function () {
});

//给编译后的文件增加md5码
gulp.task('rev', ['source', 'image'], function () {
    return gulp.src(['rev/**/*.json', 'app/main.html'])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest('dist/'));
});
//给编译后的doc文件增加md5码
gulp.task('docRev', ['rev'], function () {
    return gulp.src(['rev/**/*.json'])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest('dist/'));
});
//替换入口静态文件地址
gulp.task('replaceTemplate', ['rev'], function () {
    return gulp.src(['dist/main.html', 'dist/doc.html'])
        .pipe(template({APP_NAME: APP_NAME, APP_DOMAIN: APP_DOMAIN}))
        .pipe(gulp.dest('dist/'));
});
gulp.task('replaceTemplate-debug', ['docRev'], function () {
    return gulp.src(['dist/main.html'])
        .pipe(template({APP_NAME: '', APP_DOMAIN: ''}))
        .pipe(gulp.dest('dist/'));
});
/**
 * 构建
 */
gulp.task('build', ['clean'], function () {
    return gulp.start('replaceTemplate');
});
gulp.task('default', ['clean'], function () {
    return gulp.start('replaceTemplate');
});
gulp.task('docBuild', ['clean'], function () {
    return gulp.start('replaceTemplate-debug');
});
gulp.task('debug', ['docBuild']);
gulp.task('fileWatch', ['debug'], function () {
    //return gulp.src(['./dist/main.html', './dist/doc.html'])
    //    .pipe(connect.reload());
});

gulp.task('serve', function () {
    gulp.start('debug');
    connect.server({
        livereload: true,
        root: './dist',
        port: 30000
    });
    gulp.watch(['./app/**/*.*', './framework/**/*.*', './gulpfile.js'], ['fileWatch']);
});
