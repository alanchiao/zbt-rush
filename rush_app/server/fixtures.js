//Standard fixture loading when the database is empty. For development convenience.

if (Rides.find().count() === 0){
    libFixtures.sampleRides.forEach(function(ride){
        Meteor.call('ride', ride, function(error, id){
            if(error){
                return alert(error.reason);
            }
        });
    });
}

if (Drivers.find().count() === 0){
    libFixtures.sampleDrivers.forEach(function(driver){
        Meteor.call('driver', driver, function(error,id){
            if(error){
                return alert(error.reason);
            }
        });
    });
}
