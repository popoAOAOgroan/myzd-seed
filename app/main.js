
define(function(require) {

    var app = angular.module('myzd', ['ui.router','ngResource']);

    app.controller('AppMainCtrl', ['$scope', function ($scope) {
        $scope.enterTip = '正在拼命加载中';
        document.title = "我要运动";
    }]);
});