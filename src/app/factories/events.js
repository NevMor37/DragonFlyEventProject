(function() {
  'use strict';

  angular
      .module('dragonflyApp')
      .factory('eventsFactory', ['$q', '$http', 'toastr', function($q, $http, toastr) {

    var services = {
      
      listEvents : listEvents,
      getEventStatus : getEventStatus,
      modifyEvent: modifyEvent
//      ,getEventStatus: getEventStatus
//      setEventStatus: setEventStatus
    }

        var base_address = "http://dev.dragonflyathletics.com:1337/api/dfkey/";

    function success(data) {

            //if data.config.url has "status" and if it is put then toastr.info succesfully updated attendance

            if(data.config.method === "PUT")
            {
              toastr.info('Succesfully updated attendance for event');
            }
            console.log(data);

            return $q.resolve(data.data);
        }

        function error(error) {
          //if data.config.url has "status" and if it is put then toastr.info then error toaster updating event attendance
          if( error.config.method === "PUT")
            {
              toastr.error('Unable to update attendance for event');
            }
            console.log(error);
            console.log("There was an error");


            return $q.reject(error);
        }

        function listEvents()
        {
          var listEventsUrl = base_address + 'events';

          //var auth = window.btoa("shubinwu:evalpass");
          //var headers = {"Authorization": "Basic " + auth};

          return $http.get(listEventsUrl).then(success, error);

        }
        //{apiRoot}/events/{eventId}/status/{userName}

        function getEventStatus(event_id, user_name)
        {
          var eventStatusUrl = base_address + "events/" + event_id + "/status/" + user_name;

          return $http.get(eventStatusUrl).then(success, error);
        }

        function modifyEvent(event_id, user_name, attendance_flg)
        {
          var payload = {"coming" : attendance_flg}
          var eventStatusUrl = base_address + "events/" + event_id + "/status/" + user_name;

          return $http.put(eventStatusUrl, payload).then(success, error);
        }

    return services;
  }]);
     
  

})();
