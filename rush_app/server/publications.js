//Standard publish/subscribe logic
Meteor.publish('drivers', function(){
    return Drivers.find();
});

Meteor.publish('rides', function(){
	return Rides.find();
});
