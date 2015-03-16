'use strict';
app.factory('userService', ['$q', '$injector', '$location', 'ngAuthSettings', function ($q, $injector, $location, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var $http;
    var userServiceFactory = {};

    var _getTaskUsers = function () {
        var users = [];

        var user = { userName: "matt.price", displayName: "Matt Price" };
        users.push(user);
        user = { userName: "mindy.arvisu", displayName: "Mindy Arvisu" };
        users.push(user);
        user = { userName: "owen.williams", displayName: "Owen Williams" };
        users.push(user);
        user = { userName: "all", displayName: "Anyone" };
        users.push(user);
        return users;
    }

    var _getTaskUser = function (userName) {
        var users = _getTaskUsers();
        for (var i = 0; i < users.length; i++){
            if (users[i].userName == userName) {
                return users[i];
            }
        }
        return null;
    }

    
    userServiceFactory.getTaskUsers = _getTaskUsers;
    userServiceFactory.getTaskUser = _getTaskUser;

    return userServiceFactory;
}]);