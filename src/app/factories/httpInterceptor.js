(function() {
  'use strict';


angular.module('dragonflyApp')
.factory('httpRequestInterceptor',
['$rootScope', function($rootScope)
 {
  return {
   request: function($config) {



     $config.headers['Authorization'] = "Basic " +  window.btoa("shubinwu:evalpass");



  return $config;
  }
 };
}]);



})();