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
           'rides': []
        });

        var driverId = Drivers.insert(driver);

        return driverId;
     },


     addRide: function(rideId, driverId){
         var driver = Drivers.find(driverId).fetch()[0];
         var rides = driver.rides;
         rides.push(rideId);
         Drivers.update(driverId, {$set:{"rides":rides}});
     },

     removeRide: function(ride){
     }
});
