'use strict';
app.factory('taskService', ['$q', '$injector', '$location', 'ngAuthSettings', function ($q, $injector, $location, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var $http;
    var taskServiceFactory = {};

    var _getTaskByKey = function (taskKey) {
        $http = $http || $injector.get('$http');
        var url = serviceBase + 'api/tasks/v1/task/' + taskKey;        
        var config = {
            method: 'GET',
            url: url,
            unique: true,
            requestId: 'retrieve-taskbykey'
        };
        return $http(config).then(function (response) {
            return response;
        });
    }
    var _retrieveTasks = function (userName, includeCompleted) {

        $http = $http || $injector.get('$http');
        var url = serviceBase + 'api/tasks/v1/task/';
        if(userName != ""){
            url += userName;
        }
        url += "?includeCompleted=" + includeCompleted;
        var config = {
            method: 'GET',
            url: url,
            unique: true,
            requestId: 'retrieve-tasks'
        };
        return $http(config).then(function (response) {
            return response;
        });

    };
    var _saveTask = function (task) {
        $http = $http || $injector.get('$http');
        var config = {
            method: 'POST',
            url: serviceBase + 'api/tasks/v1/task',
            data: task,
            unique: true,
            requestId: 'save-task'
        };
        return $http(config).then(function (response) {
            return response;
        });
    }
    taskServiceFactory.retrieveTasks = _retrieveTasks;
    taskServiceFactory.retrieveTaskByKey = _getTaskByKey;
    taskServiceFactory.saveTask = _saveTask;

    return taskServiceFactory;
}]);