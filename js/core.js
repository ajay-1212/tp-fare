

$(document).ready(function() {

   $('.datepicker').pickadate({
     selectMonths: true, // Creates a dropdown to control month
     selectYears: 15 // Creates a dropdown of 15 years to control year
   });
 });

var TravelPort = angular.module('TravelPort', ['ui.router']);

TravelPort.config(function($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise('/search');

  $stateProvider
  .state('search',{
    url:'/search',
    templateUrl:'search.html',
    controller:'search'
  })
  .state('flights', {
    url: '/flights/:originCity/:destinationCity/:calanderdate',
    templateUrl: 'flights.html',
    controller: 'flights'
  })
});

TravelPort.controller('flights', function($scope,$http,$state, $stateParams,$rootScope,$timeout,$filter) {
  var origin=$stateParams.originCity;
  var destination=$stateParams.destinationCity;
  var date=$stateParams.calanderdate;
  $scope.origin=origin;
  $scope.destination=destination;
  $scope.date=date;

  var outData={  "FareSearchRequest": {    "Origin": "LAX",    "Destination": "SIN",    "DepartureDate": "2016-10-31",
 "ReturnDate": "", "PassengerType": "ADT"}};

 $scope.splitFares = function(string, nb) {
   var array = string.split('.');
   return array[nb];
 };


 $scope.closeall = function() {
     $('.rulesdiv').slideUp(100);
 }


 $scope.showRules = function(keyid) {
   console.log("show Rules");
   $('.rulesdiv').slideUp(100);
   $('#'+keyid).slideDown();
   var out={
   "RuleRequest": {
   "Key": "LAXSIN001",
   "Origin": "LAX",
   "Destination": "SIN",
   "DepartureDate": "2016-10-31",
   "ReturnDate": "",
   "PassengerType": "ADT"
   }
   };
   return $http({
    method : 'POST',
    url : "http://tpfare.herokuapp.com/getRules/",
    data: out,
    headers : {
        "Authorization":"Bearer jHBGzFs1LRennqdGsdFj_pgxw3ka",'Content-Type' : 'application/json'}
   }).success(function(results, status, headers, config) {

    $scope.ruleitem=results.RuleResponse;

   }).error(function(data, status, headers, config) {
    console.log("status : "+status+"data :"+data);
   });

   return  $scope.ruleitem;


 }

  return $http({
      method : 'POST',
      url : "http://tpfare.herokuapp.com/getFares/",
      data: outData,
      headers: {
      'Access-Control-Allow-Headers': true,
       'Access-Control-Allow-Origin': true,
       'Content-Type' : 'application/json'
     }
   }).success(function(results, status, headers, config) {
      $scope.searchResults = results.FareSearchResponse.FareInfo;
    }).error(function(data, status, headers, config) {
      console.log("status : "+status+"data :"+data);
    });











});


TravelPort.controller('search', function($scope,$http,$state, $stateParams,$rootScope,$timeout) {


  $scope.originsugg = false;
  $scope.destinationsugg = false;

  $scope.showoriginsuggestion = function() {
    $scope.originsugg = true;
  }

  $scope.showdestinationsuggestion = function() {
    $scope.destinationsugg = true;
  }

  $scope.convertToDate = function (inputFormat){
    function pad(s) { return (s < 10) ? '0' + s : s; }
   var d = new Date(inputFormat);
   return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-');
  };


  $scope.cities={"Cities": [{"name" : "Los Angeles", "code": "LAX"},
   {"name" : "Singapore", "code": "SIN"},
   {"name" : "Boston", "code": "BOS"},
   {"name" : "Chicago", "code": "ORD"},
   {"name" : "New York City", "code": "NYC"},
   {"name" : "San Francisco", "code": "SFO"}]};


   $scope.updateOrigin = function(city) {
     $scope.origin=city;
     $scope.originsugg = false;

   }

   $scope.updateDestination = function(city) {
     $scope.destination=city;
     $scope.destinationsugg = false;

   }



  $scope.splitFares = function(string, nb) {
    var array = string.split('.');
    console.log(array[nb]);
    return array[nb];
  };

});
