Template.driverItem.events({
  'click [data-js=delete]': function(e){
    e.stopPropagation();
    if (confirm("Are you sure you want to delete " + this.name + "? Any assigned rides will be unassigned.")) {
			if(this.isAssigned === true){
				var id = this._id;
				var activeDriver = ActiveDrivers.findOne({driverId: id});
				Cars.update(activeDriver.carId, {$set: {isAssigned:false}});
				activeDriver.rideIds.forEach(function(rideId){
					Meteor.call("unAssignRide", id, rideId, function(error){});
				});
				Drivers.update(id, {$set: {isAssigned:false}});
				ActiveDrivers.remove(activeDriver._id);
			}
			Drivers.remove(this._id);
		}
  }
});
