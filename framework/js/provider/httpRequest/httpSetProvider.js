app.factory('HttpSetProvider', ['$http', 'debugConfig', 'DefaultStorage', function ($http, debugConfig, DefaultStorage) {
    return {
        setCommonAuthorization: function (value) {
            if(value){
                $http.defaults.headers.common['Authorization'] = value;
                DefaultStorage.SESSION_TOKEN.putItem('authorization', value);
                console.log($http.defaults.headers.common['Authorization'] );
            }else{
                $http.defaults.headers.common['Authorization'] = DefaultStorage.SESSION_TOKEN.getItem('authorization');
            }
        },
        getCommonAuthorization: function(){
            return $http.defaults.headers.common['Authorization'];
        },
        removeCommonAuthorization: function () {
            $http.defaults.headers.common['Authorization'] = '';
        },
        reSetCommonAuthorization: function(value){
            if(value){
                $http.defaults.headers.common['Authorization'] = value;
                DefaultStorage.SESSION_TOKEN.putItem('authorization', value)
            }else{
                $http.defaults.headers.common['Authorization'] = debugConfig.HTTP_PROVIDER_CONFIG.headers.authorization;
                DefaultStorage.SESSION_TOKEN.putItem('authorization', debugConfig.HTTP_PROVIDER_CONFIG.headers.authorization)
            }
        }
    }
}]);