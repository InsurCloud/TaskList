'use strict';
app.controller('tasksController', ['$scope', '$location', 'taskService', 'userService', 'localStorageService', function ($scope, $location, taskService, userService, localStorageService) {

    $scope.message = "";
    
    $scope.tasks = [];

    $scope.$watch(
        'showCompletedTasks',
        function (newValue, oldValue) {
            //console.log("checking new value");
            if (newValue == undefined) {
                //console.log("reset to false");
                $scope.showCompletedTasks = false
            }
            //console.log("Set localstorage value = ", $scope.showCompletedTasks);
            localStorageService.set('showAllTasks', $scope.showCompletedTasks);
            //console.log("Get tasks");
            $scope.getTasks();            
        }, true
    );
    
    var _getTasks = function () {
        
        taskService.retrieveTasks("", $scope.showCompletedTasks).then(function (response) {
            $scope.tasks = response.data;            
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
            $scope.finishLoadUser = true;
        })
    };

    var _getUserDisplayName = function (userName) {
        //console.log("getting display name for user ", userName);
        var user = userService.getTaskUser(userName);
        if (user == null)
            return "Unknown";
        return user.displayName;
    };
    $scope.getUserDisplayName = _getUserDisplayName;

    var _editTask = function (taskKey) {
        if (taskKey != undefined) {
            $location.path('/task/' + taskKey);
        } else {
            $location.path('/task');
        }
        
    };

    $scope.editTask = _editTask;
    $scope.getTasks = _getTasks;

    $scope.showCompletedTasks = localStorageService.get('showAllTasks');
    
    if ($scope.showCompletedTasks == 'true') {        
        $scope.showCompletedTasks = true;
    } else {
        $scope.showCompletedTasks = false;

    }
}]);