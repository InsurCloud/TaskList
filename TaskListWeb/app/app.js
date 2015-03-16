var serviceBase = 'http://localhost:49521/';

var app = angular.module('taskListApp', ['ngRoute', 'LocalStorageModule', 'ui.bootstrap', 'ngAnimate', 'f.bootstrap-switch']);

app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngTaskListApp'
});

app.config(function ($routeProvider) {

    $routeProvider.when("/tasks", {
        controller: "tasksController",
        templateUrl: "/app/views/tasks.html"
    });

    $routeProvider.when("/task/:taskKey", {
        controller: "taskController",
        templateUrl: "/app/views/task.html"
    });

    $routeProvider.when("/task", {
        controller: "taskController",
        templateUrl: "/app/views/task.html"
    });

    $routeProvider.otherwise({ redirectTo: "/tasks" });

});