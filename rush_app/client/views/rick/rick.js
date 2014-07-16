//Connects rides and drivers portion of the rick app
// TODO: change name -> data-id or something similar
Template.rick.events({
    'click [data-js=ride]': function(e){
        var rideEl = e.currentTarget;
        if (!$(rideEl).data('selected') && !$(rideEl).data('editing')){
            selectRide(rideEl);
        } else {
            deselectRide(rideEl);
        }
     },

    'click [data-js=driver]': function(e){
        var driverEl = e.currentTarget;
        var sr = selectedRides();
        var sd = selectedDrivers();
        if (sr.length == 0){
            if (!$(driverEl).data('selected')){
                selectDriver(driverEl);
            } else {
                deselectDriver(driverEl);
            }
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
    },

    'click [data-js=handle]': function(e){
        utils.toggleDrawer(e.target);
        return false;
    }
});

var selectRide = function(rideEl){
    $(rideEl).data('selected', true);
    $(rideEl).addClass('selected');
}

var deselectRide = function(rideEl){
    $(rideEl).removeData('selected');
    $(rideEl).removeClass('selected');
}

var selectedRides = function(){
    return $('[data-js=ride]').filter(function(index, ride){
        return $(ride).data('selected');
    });
}

var deselectAllRides = function(){
    for (var index in selectedRides){
        var rideEl = selectedRides[index];
        deselectRide(rideEl);
    }
}

var selectDriver = function(driverEl){
    $(driverEl).data('selected', true);
    $(driverEl).addClass('selected');
}

var deselectDriver = function(driverEl){
    $(driverEl).removeData('selected');
    $(driverEl).removeClass('selected');
}

var selectedDrivers = function(){
    return $('[data-js=driver]').filter(function(index, driver){
        return $(driver).data('selected');
    });
}
