//Standard publish/subscribe logic
Meteor.publish('drivers', function(){
    return Drivers.find();
});

Meteor.publish('rides', function(){
	return Rides.find();
});

Meteor.publish('cars', function(){
	return Cars.find();
});

Meteor.publish('activeDrivers', function(){
	return ActiveDrivers.find();
});
