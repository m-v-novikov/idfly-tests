'use strict';

/* Controllers */

var phonecatApp = angular.module('phonecatApp', ['phonecatApp.filters', 'phonecatApp.filters1']);

phonecatApp.controller('PhoneListCtrl',['$scope', '$http', function($scope, $http) {

    //localStorage
    var ObjectStorage = function ObjectStorage( name, duration ) {
        var self,
            name = name || '_objectStorage',
            defaultDuration = 5000;

        // ���� �� ������� ���� �����������, ������������ ���� � ��� �� ���� ���������,
        // ������ ���������� ������������ � �������� ������,
        // ����� ������ duration (���� �������)
        if ( ObjectStorage.instances[ name ] ) {
            self = ObjectStorage.instances[ name ];
            self.duration = duration || self.duration;
        } else {
            self = this;
            self._name = name;
            self.duration = duration || defaultDuration;
            self._init();
            ObjectStorage.instances[ name ] = self;
        }

        return self;
    };
    ObjectStorage.instances = {};
    ObjectStorage.prototype = {
        // type == local || session
        _save: function ( type ) {
            var stringified = JSON.stringify( this[ type ] ),
                storage = window[ type + 'Storage' ];
            if ( storage.getItem( this._name ) !== stringified ) {
                storage.setItem( this._name, stringified );
            }
        },

        _get: function ( type ) {
            this[ type ] = JSON.parse( window[ type + 'Storage' ].getItem( this._name ) ) || {};
        },

        _init: function () {
            var self = this;
            self._get( 'local' );
            self._get( 'session' );

            ( function callee() {
                self.timeoutId = setTimeout( function () {
                    self._save( 'local' );
                    callee();
                }, self._duration );
            })();

            window.addEventListener( 'beforeunload', function () {
                self._save( 'local' );
                self._save( 'session' );
            });
        },
        // �� ������, ���� ����� ������� ������� (clearTimeout( storage.timeoutId ))
        timeoutId: null,
        local: {},
        session: {}
    };

    $scope.storage = new ObjectStorage;
    //delete $scope.storage.local.entriesCalls; //uncomment for reset array
    console.log( $scope.storage );

    $scope.submitFormCalls = function(obgNew){
        //$scope.method = 'GET';
        //$scope.url = 'entries-calls/asd.html';
        //$http.post('entries-calls/listAllCalls.json', { name: "John", time: "2pm" });
        //$http.get($scope.url).success(function(data) {
        //    //console.log(data);
        //});
        //$http({method: $scope.method, url: $scope.url, data: formData})
        //    .success(function(data, status) {
        //        $scope.status = status;
        //        $scope.data = data;})
        //    .error(function(data, status) {
        //        $scope.data = data || "Request failed";
        //        $scope.status = status;
        //    });

        //console.log(angular.toJson($scope.formEntriesCalls));
        if($scope.storage.local.hasOwnProperty('entriesCalls')){
            $scope.storage.local.entriesCalls.push(obgNew);
            console.log(obgNew);
        }else{
            $scope.storage.local.entriesCalls = [];
            $scope.storage.local.entriesCalls.push(obgNew);
        }
        console.log($scope.storage);

    };
    $scope.calls = [
        {
            "title": "title4",
            "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "project": "citizen",
            "speed": "low",
            "date": "12.12.2012"
        },
        {
            "title": "title1",
            "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "project": "mens",
            "speed": "medium",
            "date": "12.11.2012"
        },
        {
            "title": "title2",
            "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "project": "mens",
            "speed": "low",
            "date": "10.12.2012"
        },
        {
            "title": "title3",
            "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "project": "womens",
            "speed": "hight",
            "date": "10.12.2012"
        }
    ];
    if(!$scope.storage.local.hasOwnProperty('entriesCalls')){
        console.log('!hasOwnProperty(entriesCalls)');
        $scope.storage.local = {entriesCalls:$scope.calls};
    }

    $scope.optionsArr = [];
    $scope.temporayOptions = [];
    $scope.chooseOpt = '';
    $scope.setSortOpt = function(nameOpt){
        $scope.chooseOpt = nameOpt;
    };


    $scope.selectedProjects = [];
    $scope.setSelectedProj = function () {
        var proj = this.call.project;
        $scope.selectedProjects.push(proj);

        return false;
    };


    //sort on title of table
    $scope.sortField = undefined;
    $scope.reverse = false;

    $scope.sort = function(fieldName){
        if($scope.sortField === fieldName){
            $scope.reverse = !$scope.reverse;
        }else{
            $scope.sortField = fieldName;
            $scope.reverse = false;
        }
    };

    //sort on project in table
    $scope.projSortField = undefined;

    $scope.projSort = function(fieldName){
        //console.log(fieldName + ' projSort');
        $scope.projSortField = fieldName;
    };
    $scope.sortFieldHelp = function(fieldName, projName){
        //console.log(fieldName + ' ' + projName + ' sortFieldHelp');
    };

    //sort entriesCalls.project's for select option's
    $scope.projSortOpt = [];
    $scope.sortOpt = function(optionName){
        for( var i=0; i<$scope.storage.local.entriesCalls.length; i++){
            var item = $scope.storage.local.entriesCalls[i][optionName];
            if($scope.projSortOpt.indexOf(item) == -1){
                $scope.projSortOpt.push(item);
            }
        }
        //console.log($scope.projSortOpt);
        //$scope.projSortOpt = fieldName;
    };

    //I have an error on duple! - Error: [ngRepeat:dupes] Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: opt in storage.local.entriesCalls | filter:orderBy:projSortOpt, Duplicate key: object:87, Duplicate value:
    //I set 'track by $index' for disable this errors. but maybe i wrong
}]);

angular.module('phonecatApp.filters', []).filter('projectFilter', [function(){
    return function(projField, projName){

        //console.log(projField, projName);
        if (!angular.isUndefined(projField) && !angular.isUndefined(projName) && projName.length > 0){
            var tempProjects = [];

            angular.forEach(projName, function (projectN) {
                angular.forEach(projField, function (projectF) {
                    if (angular.equals(projectF.project, projectN)) {
                        tempProjects.push(projectF);
                    }
                });
            });
            return tempProjects;
        }else{
            return projField;
        }
    }
}]);

angular.module('phonecatApp.filters1', []).filter('selectedOption', [function(){
    return function(defArr, optArr, tempArr){
        //console.log(defArr, optArr, tempArr);
        if (!angular.isUndefined(optArr) && !angular.isUndefined(optArr)){

            for(var i = 0; i < defArr.length; i++){

                if (tempArr.indexOf(defArr[i].project) == -1){
                    optArr.push(defArr[i]);
                    tempArr.push(defArr[i].project);
                    console.log(optArr);
                }
            }
            return optArr;

        }else{
            return defArr;
        }
    }
}]);