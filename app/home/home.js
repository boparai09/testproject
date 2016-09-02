'use strict';

angular.module('myApp.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        });
    }])
    /**
     * @ngdoc object
     * @name myApp.home:HomeCtrl
     * @description
     * # Controller
     * Controller for home screen. contains all the behavioral functions for home screen
     */
    .controller('HomeCtrl', ['$scope', 'student','$uibModal', '$log', function ($scope, student, $modal, $log) {
        $scope.students = student.getStudents();
        $scope.view = 'card';
        $scope.sortBy = 'name';
        $scope.searchText = '';

        $scope.openNew = function () {
            var modalInstance = $modal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'newStudent.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: '$ctrl'
            });

            modalInstance.result.then(function (selectedItem) {
                selectedItem.dob= $scope.formatDate(selectedItem.dob);
                selectedItem.dateOfJoining = $scope.formatDate(selectedItem.dateOfJoining);
                $scope.students.push(selectedItem);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.formatDate = function (date) {
            if(angular.isDefined(date)){
                var localDate = new Date(date);
                date = localDate.getDate()+'/'+(localDate.getMonth()+1)+'/'+localDate.getFullYear();
            }
            return date;
        };
        $scope.deleteRecord = function (index) {
            if (index < $scope.students.length) {
                $scope.students.splice(index, 1);
            }
        };
    }])
    .controller('ModalInstanceCtrl', function ($uibModalInstance) {
        var $ctrl = this;
        $ctrl.student = {
            name: '',
            id: '',
            dob: '',
            department: null,
            title: null,
            dateOfJoining: ''
        };
        $ctrl.dateOptions = {
            dateDisabled: false,
            formatYear: 'yy',
            maxDate: new Date(),
            startingDay: 1
        };
        $ctrl.ok = function () {
            $uibModalInstance.close($ctrl.student);
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    /**
     * @ngdoc service
     * @name myApp.home:student
     * @description
     * # rest
     * Service to talk with backend api.
     */
    .factory('student', ['$q', '$timeout',
        function ($q, $timeout) {
            return {
                /**
                 * @ngdoc method
                 * @name myApp.home:student#getStudents
                 * @methodOf myApp.home:student
                 *
                 * @description
                 * Method to get data form the backend api for past transactions
                 * @example
                 * student.getStudents();
                 * @returns {httpPromise} resolve with fetched data, or fails with error description.
                 */
                getStudents: function () {
                    return [
                        {"name": "Rahul", "id": 2342, "dob": "13/09/1981", "department": "IT", "title": "Mr", "dateOfJoining": "12/01/2010"},
                        {"name": "Jatin", "id": 2342, "dob": "13/09/1981", "department": "IT", "title": "Mr", "dateOfJoining": "12/01/2010"},
                        {"name": "Jado", "id": 23423, "dob": "13/09/1985", "department": "ECE", "title": "Mr", "dateOfJoining": "01/01/2000"},
                        {"name": "Manpreet", "id": 21, "dob": "13/09/1989", "department": "CSE", "title": "Mr", "dateOfJoining": "09/12/2010"}
                    ];
                },

                /**
                 * @ngdoc method
                 * @name myApp.home:student#addNewStudent
                 * @methodOf myApp.home:student
                 *
                 * @description
                 * Method to save data of current transactions
                 * @example
                 * student.addNewStudent(data);
                 * @param {object} entity having current validated trade data
                 * @returns {httpPromise} resolve with fetched data, or fails with error description.
                 */
                addNewStudent: function () {
                    var deferred = $q.defer();
                    $timeout(function () {
                        deferred.resolve();
                    }, 1000);
                    return deferred.promise;
                }
            };
        }
    ]);
  