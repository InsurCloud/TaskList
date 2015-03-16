'use strict';
app.controller('taskController', ['$scope', '$timeout', '$routeParams', '$location', 'taskService', 'userService', function ($scope, $timeout, $routeParams, $location, taskService, userService) {

    $scope.newTask = false;
    $scope.taskKey = "";
    $scope.headLine = "";
    $scope.users = []

    $scope.getUsers = function () {
        $scope.users = userService.getTaskUsers()
    };

    $scope.getUsers();

    if ($routeParams && $routeParams.taskKey) {
        $scope.taskKey = $routeParams.taskKey;
        $scope.headLine = "Edit Task";
    } else {
        $scope.newTask = true;
        $scope.headLine = "New Task"
    }

    $scope.message = "";

    $scope.task = {};

    var _getTask = function (taskKey) {
        if (!$scope.newTask) {
            $scope.task = $scope.retrieveTask(taskKey);
        } else {
            $scope.task = {
                taskKey: "",
                taskName: "",
                taskDescription: "",
                assignedTo: "",
                completed: false
            };
        }        
    };

    $scope.retrieveTask = function (taskKey) {
        taskService.retrieveTaskByKey(taskKey).then(function (response) {
            $scope.task = response.data;
        }, function (response) {
            var errors = [];
            for (var key in response.data.modelState) {
                for (var i = 0; i < response.data.modelState[key].length; i++) {
                    errors.push(response.data.modelState[key][i]);
                }
            }
            if (errors.length == 0) {
                $scope.message = response.message;
            } else {
                $scope.message = "Failed to udpate password:" + errors.join(' ');
            }
            if ($scope.message == "") {
                $scope.message = "Error occurred";
            }
        });
    };

    $scope.getTask = _getTask;    

    $scope.getTask($scope.taskKey);

    $scope.alerts = [];

    $scope.addAlert = function (style, msgStr) {
        var style = 'alert alert-' + style + ' alert-dismissible animate-repeat';
        var len = $scope.alerts.push({ type: style, msg: msgStr, index: 0 });
        for(var i = 0; i < $scope.alerts.length; i++){
            $scope.alerts[i].index = i;
        }

        $timeout(function () {
            $scope.closeAlert(len-1);
        }, 5000);
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);

        
    };

    var _saveTask = function (closeWindow) {
        taskService.saveTask($scope.task).then(function (response) {
            $scope.task = response.data;
            $scope.addAlert('success', 'Task was saved successfully!');
            if (closeWindow) {
                $location.path("/tasks");
            }            
        }, function (response) {
            var errors = [];
            for (var key in response.data.modelState) {
                for (var i = 0; i < response.data.modelState[key].length; i++) {
                    errors.push(response.data.modelState[key][i]);
                }
            }
            if (errors.length == 0) {
                $scope.message = response.message;
            } else {
                $scope.message = "Failed to udpate password:" + errors.join(' ');
            }
            console.log($scope.message);
            if ($scope.message == "") {
                $scope.message = "Error occurred";
            }
            $scope.addAlert('danger', $scope.message);
        });
    };

    $scope.saveTask = _saveTask;

}]);