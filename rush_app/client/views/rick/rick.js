//Connects rides and drivers portion of the rick app
// TODO: change name -> data-id or something similar
Template.rick.events({
    'click [data-js=ride]': function(e){

        var rideEl = e.currentTarget;
        if (!rideEl.dataset.selected){
            selectRide(rideEl);
        }
     },

    'click [data-js=driver]': function(e){
        var driverEl = e.currentTarget;
        var sr = selectedRides();
        var sd = selectedDrivers();
        if (sr.length == 0 && !driverEl.dataset.selected){
            selectDriver(driverEl);
        } else {
            var driverId = driverEl.dataset.id;
            var driver = Drivers.findOne(driverId);
            for (var i=0; i<sr.length; i++){
                var ride = sr[i];
                Meteor.call('assignRide', ride.dataset.id, driverId, function(error, id){
                    if (error){
                        return alert(error.reason);
                    }
                });
            }
            deselectAllRides();
        }
    },

    'click [data-js=reset]': function(e){
        utils.reset();
    }
});

var selectRide = function(rideEl){
    rideEl.dataset.selected = true;
    $(rideEl).addClass('selected');
}

var deselectRide = function(rideEl){
    rideEl.removeAttr('data-selected');
    $(rideEl).removeClass('selected');
}

var selectedRides = function(){
    return $('[data-js=ride]').filter(function(index, ride){
        return ride.dataset.selected;
    });
}

var deselectAllRides = function(){
    for (var index in selectedRides){
        var rideEl = selectedRides[index];
        deselectRide(rideEl);
    }
}

var selectDriver = function(driverEl){
    driverEl.dataset.selected = true;
    $(driverEl).addClass('selected');
}

var deselectDriver = function(driverEl){
    driverEl.removeAttr('data-selected');
    $(driverEl).removeClass('selected');
}

var selectedDrivers = function(){
    return $('[data-js=ride]').filter(function(index, ride){
        return ride.dataset.js;
    });
}