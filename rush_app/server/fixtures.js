if (Rides.find().count() === 0){
    utils.sampleRides.forEach(function(ride){
        Rides.insert(ride);
    });
}

if (Drivers.find().count() === 0){
    utils.sampleDrivers.forEach(function(driver){
        Drivers.insert(driver);
    });
}