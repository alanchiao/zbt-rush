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

Drivers.validate = function(data){
	var validator = ModelValidator(data);
	validator.checkNonEmpty('name');
	validator.checkNonEmpty('phone');
	return validator.getResponse();
};

Meteor.methods({
  /** 
  * Create driver
  *
  * Format of driver attributes:
  * - name: string
  * - phone: (***)-(***)-(****)
	*
	* UI-Related attributes:
	* - isAssigned: if driver is 'assigned' to be active 
  **/
  driver: function(attributes){
    var driver = _.defaults(_.extend(attributes, {
			capacity: parseInt(attributes.capacity)
    }), {
			isAssigned:false	
		});
		var response = Drivers.validate(driver);
		if(response.isInputValid === true){
			response.driverId = Drivers.insert(driver);
		}
		return response;
  },
	updateDriver: function(driver){
		var response = Drivers.validate(driver);
		return response;
	}
	/**
	deleteDriver: function(driverId){
		var driver = Drivers.findOne(driverId);
		Cars.update(this.carId, {$set: {driver:null}});
		driver.rideIds.forEach(function(rideId){
			Meteor.call("unAssignRide", driverId, rideId function(error){});
		});
		Drivers.remove(driverId);
	}
	**/
});

