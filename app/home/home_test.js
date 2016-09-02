'use strict';

describe('myApp.home module', function () {

    beforeEach(module('myApp.home'));

    describe('home controller', function () {
        var MainCtrl,
            scope,
            initialStudents = [
                {"name": "Rahul", "id": 2342, "dob": "13/09/1981", "department": "IT", "title": "Mr", "dateOfJoining": "12/01/2010"},
                {"name": "Jatin", "id": 2342, "dob": "13/09/1981", "department": "IT", "title": "Mr", "dateOfJoining": "12/01/2010"},
                {"name": "Jado", "id": 23423, "dob": "13/09/1985", "department": "ECE", "title": "Mr", "dateOfJoining": "01/01/2000"},
                {"name": "Manpreet", "id": 21, "dob": "13/09/1989", "department": "CSE", "title": "Mr", "dateOfJoining": "09/12/2010"}
            ],
            student={
                addNewStudent: function () {
                    return {then:function(para){
                        para.call();
                    }};
                },
                getStudents: function () {
                    return initialStudents;
                }
            };

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            MainCtrl = $controller('HomeCtrl', {
                $scope: scope,
                student:student
            });
        }));

        it('Need to initiate scope variables', function () {
            expect(scope.students).toBeDefined();
        });


        it('Define the functionality to delete any student', function () {
            expect(scope.deleteRecord).toBeDefined();
        });

        it('Check deleteRecord function', function () {
            scope.students = [
                {"name": "Rahul", "id": 2342, "dob": "13/09/1981", "department": "IT", "title": "Mr", "dateOfJoining": "12/01/2010"},
                {"name": "Jatin", "id": 2342, "dob": "13/09/1981", "department": "IT", "title": "Mr", "dateOfJoining": "12/01/2010"},
                {"name": "Jado", "id": 23423, "dob": "13/09/1985", "department": "ECE", "title": "Mr", "dateOfJoining": "01/01/2000"},
                {"name": "Manpreet", "id": 21, "dob": "13/09/1989", "department": "CSE", "title": "Mr", "dateOfJoining": "09/12/2010"}
            ];
            var compiled = [
                {"name": "Rahul", "id": 2342, "dob": "13/09/1981", "department": "IT", "title": "Mr", "dateOfJoining": "12/01/2010"},
                {"name": "Jatin", "id": 2342, "dob": "13/09/1981", "department": "IT", "title": "Mr", "dateOfJoining": "12/01/2010"},
                {"name": "Manpreet", "id": 21, "dob": "13/09/1989", "department": "CSE", "title": "Mr", "dateOfJoining": "09/12/2010"}
            ];
            scope.deleteRecord(2);
            expect(scope.students).toEqual(compiled);
        });
    });
});

