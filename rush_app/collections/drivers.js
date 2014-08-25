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
    var driver = _.defaults(attributes, {
			isAssigned: false
    });
    var driverId = Drivers.insert(driver);
    return driverId;
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

