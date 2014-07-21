//Standard publish/subscribe logic
Meteor.publish('drivers', function(){
    return Drivers.find();
});
