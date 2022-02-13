'use strict';

angular.module('myevent', [
    'angular-input-stars'
])
.factory('EventService', EventService)
.controller('EventsController', EventsController);

function EventService($http){
    return {
        deleteEvent:deleteEvent,
        getEvents:getEvents,
        updateStars: updateStars,
        createEvent: createEvent
    };

    function deleteEvent(id){
        return $http.delete('/api/events/' + id);
    }

    function getEvents(){
        return $http.get('/api/events/')
            .then(getEventsComplete);

        function getEventsComplete(response){
            return response.data;
        }
    }

    function updateStars(event){
        return $http.put('/api/events/' + event.id, event);
    }
    
    function createEvent(event){
        return $http.post('/api/events/' + event);
    }
}

function EventsController(EventService){
    var vm = this;
    vm.deleteEvent = deleteEvent;
    vm.updateStars = updateStars;
    vm.createEvent= createEvent
    
    activate();

    function activate() {
        return EventService.getEvents()
        .then(function(events) {
            vm.events = events;
            return vm.events;
        });
    }

    function deleteEvent(event){
        var index = vm.events.indexOf(event);
        return EventService.deleteEvent(event.id)
            .then(function() {
                vm.events.splice(index, 1);
            });
    }

    function updateStars(event){
        return EventService.updateStars(event);
    }
    
        function createEvent(event){
        return EventService.createEvent(event);
    }
}