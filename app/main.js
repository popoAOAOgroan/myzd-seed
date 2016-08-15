
define(function(require,exports) {

    exports.init = function(){  
        var app = angular.module('myzd', []);
        app.controller('AppMainCtrl', ['$scope', function ($scope) {
            $scope.enterTip = '正在拼命加载中';
            
        }]);
        angular.bootstrap(window.document, ['myzd']);
    }

});