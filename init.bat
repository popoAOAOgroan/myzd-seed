SET CWD=%~dp0

ECHO 'init...'
RD /s /q ./node_modules
ECHO 'install gulp...'
CALL npm install gulp --save-dev

ECHO 'install gulp-cssnano...'
CALL npm install gulp-cssnano --save-dev

ECHO 'install gulp-uglify...'
CALL npm install gulp-uglify --save-dev

ECHO 'install gulp-concat...'
CALL npm install gulp-concat --save-dev

ECHO 'install gulp-sass...'
CALL npm install gulp-sass --save-dev

ECHO 'install gulp-imagemin...'
CALL npm install gulp-imagemin --save-dev

ECHO 'install gulp-rev...'
CALL npm install gulp-rev --save-dev

ECHO 'install gulp-rimraf...'
CALL npm install gulp-rimraf --save-dev

ECHO 'install bower...'
CALL npm install bower --save-dev

ECHO 'install bower-sync...'
CALL npm install bower-sync --save-dev

ECHO 'install gulp-jshint...'
CALL npm install gulp-jshint --save-dev

ECHO 'install gulp-minify-html...'
CALL npm install gulp-minify-html --save-dev

ECHO 'install gulp-rev-collector...'
CALL npm install gulp-rev-collector

ECHO 'install gulp-util...'
CALL npm install gulp-util

ECHO 'install gulp-connect...'
CALL npm install gulp-connect
