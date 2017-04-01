angular.module('myApp')
    .controller('mainCtrl', function($scope, $http) {
        $scope.value = {add: "0", remove: "0"}
        console.log('Hello from Ctrl');

        var refresh = function() {
            $http.get('/inventory').success(function(response) {
                console.log("I got the data I requested");
                $scope.inventory = response;
                $scope.items = ''; // clears input boxes
            });
        }; //route to get data from, on success it should tell use it got the data
        refresh(); // invokes refresh function

        $scope.addItem = function() {
            console.log($scope.items);
            $http.post('/inventory', $scope.items).success(function(response) {
                console.log(response);
                refresh();
            }); // post data to inventory path
        }

        $scope.remove = function(id) {
            console.log(id);
            $http.delete('/inventory/' + id).success(function(response) {
                refresh();
            })
        }

        $scope.edit = function(id) {
            console.log(id);
            $http.get('/inventory/' + id).success(function(response) {
                $scope.items = response;
            })
        }

        $scope.update = function() {
            console.log($scope.items._id)
            $http.put('/inventory/' + $scope.items._id, $scope.items).success(function(response) {
                refresh();
            })
        }

        $scope.deselect = function() {
            $scope.items = "";
        }
    })
