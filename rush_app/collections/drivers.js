Drivers = new Meteor.Collection('drivers');

Drivers.allow({
    update:function(){
        return true;
    }
});

Meteor.methods({
    driver: function(attributes){
        var driver = _.extend(_.pick(attributes, 'name'),{
           'uid':1,
           'rides': []
        });

        var driverId = Drivers.insert(driver);

        return driverId;
     },


     addRide: function(ride){
        driver.rides.push(ride);
     },

     removeRide: function(ride){
     }
});
