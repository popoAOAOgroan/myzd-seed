app.factory('debugConfig', [function () {
    return {
        FOOTER_NAV_CONFIG: {
            needFooterInNative: false,
            navList: [
                {
                    name: '首页',
                    themeClass: 'home',
                    urlOrRouter: 'stadiums-index'
                },
                {
                    name: '我',
                    themeClass: 'me',
                    urlOrRouter: 'user-center'
                }
            ]
        }
    }
}]);
app.factory('DefaultStorage', ['AppLocalStorage', 'debugConfig', function (AppLocalStorage, debugConfig) {
    //默认的导航状态，目前采用sessionStorage,每次用户打开要从开头进入页面。后续可以拓展为localStorage,用以记录用户访问历史
    var session_nav_status = AppLocalStorage.sessionStorage('1yd_session_nav');
    if (!session_nav_status.getItem('footerSelectedIndex')) {
        session_nav_status.putItem('footerSelectedIndex', 0);
    }
    return {
        SESSION_NAV_STATUS: session_nav_status
    };
}]);