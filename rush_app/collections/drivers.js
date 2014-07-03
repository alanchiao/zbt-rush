Drivers = new Meteor.Collection('drivers');

Drivers.allow({
    update:function(){
        return true;
    }
});

Meteor.methods({
    driver: function(attributes){
        var driver = _.extend(_.pick(attributes, 'name', 'capacity'),{
           'uid':1,
           'rides': [],
           'occupiedSeats': 0
        });

        var driverId = Drivers.insert(driver);

        return driverId;
     },


     assignRide: function(rideId, driverId){
         var driver = Drivers.find(driverId).fetch()[0];
         var ride = Rides.find(rideId).fetch()[0];
         
         var rides = driver.rides;
         rides.push(rideId);

         var occupiedSeats = driver.occupiedSeats + ride.numPeople;

         Drivers.update(driverId, {$set:{'rides':rides, 'occupiedSeats':occupiedSeats}});
         Rides.update(rideId, {$set:{'status':'assigned'}});
     },

     removeRide: function(ride){
     }
});
