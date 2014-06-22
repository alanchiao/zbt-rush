Drivers = new Meteor.Collection('drivers');

Drivers.allow({
    update: function(){
        return true;
    }
});


Meteor.methods({
    driver: function(attributes){
        var driver = _.extend(_.pick(attributes, 'uid', 'location'),{
            clientId: true
        });
        
        var driverId = Drivers.insert(driver);

        return driverId;
    }
});
