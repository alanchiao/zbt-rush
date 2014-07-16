if (Rides.find().count() === 0){
    utils.sampleRides.forEach(function(ride){
        Meteor.call('ride', ride, function(error, id){
            if(error){
                return alert(error.reason);
            }
        });
    });
}

if (Drivers.find().count() === 0){
    utils.sampleDrivers.forEach(function(driver){
        Meteor.call('driver', driver, function(error,id){
            if(error){
                return alert(error.reason);
            }
        });
    });
}
