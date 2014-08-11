Cars = new Meteor.Collection("cars");

Cars.allow({
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
	/**
	* Create car
	*
	* Format of car attributes:
	* description
	* capacity
	* allowedDrivers
	* lastPingTime, lastLatitude, lastLongitude
	**/
	car: function(attributes){

		var car = _.extend(attributes, {
			allowedDrivers: [],
			lastPingTime: null,
			lastLatitude: null,
			lastLongitude: null
		});

		var carId = Cars.insert(car);
		return carId;
	},

	updateLocation: function(carId, latitude, longitude){
	}
});

