(function() {
  'use strict';

  angular
    .module('dragonflyApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, toastr, eventsFactory, $interval) {


    var vm = this;

    vm.user_name = "shubinwu";
    vm.attendanace_flg = true;

    vm.selected_mainevent = false;
    vm.mainevent = {};
    vm.mainevent.location = {};
    vm.mainevent.location.city = "";

    vm.awesomeThings = [];
    vm.events = [];
    vm.loading_events = true;
    vm.classAnimation = '';
    vm.creationDate = 1520721760682;
    vm.showToastr = showToastr;

    vm.getThumbnailUrl = getThumbnailUrl;

    vm.setMainEvent = setMainEvent;
    vm.getImageUrl = getImageUrl;

    vm.updateAttendateMainEvent = updateAttendateMainEvent;

    activate();

//    console.log(eventsFactory.listEvents());

    eventsFactory.listEvents().then(setEvents);

    function activate() {

      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function setEvents(response)
    {
      vm.loading_events = false;

      
      vm.events = response;

      console.log("WTFFF");

    }

    //Stuff to get attendance for event
    function updateAttendateResult(response)
    {
      console.log("updating attendate result");
      console.log(response);


      if(response === "")
      {
        toastr.error('Error getting event status from server');
        //vm.attendanace_flg = false;
        //return;
      }

      vm.attendanace_flg = response.coming;
      
    }

    function checkEventStatus()
    {
      if('id' in vm.mainevent)
      {
        eventsFactory.getEventStatus(vm.mainevent.id, vm.user_name).then(updateAttendateResult)
      }
    }
    $interval(checkEventStatus, 4000);



    function updateAttendateMainEvent()
    {
      console.log("inside updateAttendateResult " + vm.attendanace_flg);
      console.log("updateAttendateMainEvent:::this the evewnt id " + vm.mainevent.id);
      eventsFactory.modifyEvent(vm.mainevent.id, vm.user_name, vm.attendanace_flg).then( function() 
      { 
         } );
      //eventsFactory.getEventStatus(event.id, vm.user_name).then(updateAttendateResult);
    }

    function setMainEvent(event) {
      vm.selected_mainevent = true;
      vm.mainevent = event;
      console.log("setMainEvent:::this the evewnt id " + event.id);
      //eventsFactory.getEventStatus(event.id, vm.user_name).then(updateAttendateResult);
    }

    function getThumbnailUrl(event)
    {



      if('id' in event && 'images' in event && event.images.length > 0)
      {
      return "http://dev.dragonflyathletics.com:1337/api/dfkey/events/" + event.id + "/media/" + event.images[0].id;
      }
      else
      {
        return "";
      }

    }


    function getImageUrl(event_id, image)
    {
      return "http://dev.dragonflyathletics.com:1337/api/dfkey/events/" + event_id + "/media/" + image.id;
    }

  }
})();
