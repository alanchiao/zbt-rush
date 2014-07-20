Drivers = new Meteor.Collection('drivers');

Drivers.allow({
    insert: function(){
        return true;
    },
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    }
});

Meteor.methods({
    driver: function(attributes){
        var driver = _.extend(attributes, {
           'uid':1,
           'rides': [],
           'passengers': 0,
        });

        var driverId = Drivers.insert(driver);
        //TEST: Using only my phone for now. Feel
        //free to change to your own phone.
        if(driver.phone === '(978)-621-9636'){
            Meteor.call('textSomeone', driverId, function(error){});
        }

        return driverId;
     },


     assignRide: function(rideId, driverId){
         var driver = Drivers.find(driverId).fetch()[0];
         var ride = Rides.find(rideId).fetch()[0];
         
         var rides = driver.rides;
         rides.push(ride);

         var passengers = parseInt(driver.passengers) + parseInt(ride.passengers);

         Drivers.update(driverId, {$set:{'rides':rides, 'passengers':passengers}});
         Rides.update(rideId, {$set:{'status':'assigned'}});
     },
});
