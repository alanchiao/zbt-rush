//Connects rides and drivers portion of the rick app
// TODO: change name -> data-id or something similar
Template.rick.events({
    'click [data-js=ride]': function(e){
        var rideEl = e.currentTarget;
        if (selectedRides.indexOf(rideEl) == -1){
            selectRide(rideEl);
        }
     },

    'click [data-js=driver]': function(e){
        var driverEl = e.currentTarget;
        if (selectedRides.length == 0 && selectedDrivers.indexOf(driverEl) == -1){
            selectDriver(driverEl);
        } else {
            var driverId = driverEl.dataset['id'];
            var driver = Drivers.find(driverId).fetch()[0];
            for (var index in selectedRides){
                var ride = selectedRides[index];
                Meteor.call('assignRide', ride.dataset['id'], driverId, function(error, id){
                    if (error){
                        return alert(error.reason);
                    }
                });
            }
            selectedRides = [];
        }
    },

    'click [data-js=reset]': function(e){
        utils.reset();
    }
});

var selectRide = function(rideEl){
    selectedRides.push(rideEl);
    $(rideEl).addClass('selected');
}

var deselectRide = function(rideEl){
    selectedRides.pop(rideEl);
    $(rideEl).removeClass('selected');
}

var deselectAllRides = function(){
    for (var index in selectedRides){
        var rideEl = selectedRides[index];
        deselectRide(rideEl);
    }
}

var selectDriver = function(driverEl){
    selectedDrivers.push(driverEl);
    $(driverEl).addClass('selected');
}

var deselectDriver = function(driverEl){
    selectedDrivers.pop(driverEl);
    $(driverEl).removeClass('selected');
}

var selectedRides = [];
var selectedDrivers = [];