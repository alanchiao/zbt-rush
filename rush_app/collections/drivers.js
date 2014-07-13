Drivers = new Meteor.Collection('drivers');
CollectionHandler.addCollection('Drivers', Drivers);

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
        var driver = _.extend(attributes,{
           'uid':1,
           'rides': [],
           'passengers': 0
        });

        var driverId = Drivers.insert(driver);

        return driverId;
     },


     assignRide: function(rideId, driverId){
         var driver = Drivers.find(driverId).fetch()[0];
         var ride = Rides.find(rideId).fetch()[0];
         
         var rides = driver.rides;
         rides.push(rideId);

         var passengers = parseInt(driver.passengers) + parseInt(ride.passengers);

         Drivers.update(driverId, {$set:{'rides':rides, 'passengers':passengers}});
         Rides.update(rideId, {$set:{'status':'assigned'}});
     },

     removeRide: function(ride){
     }
});
