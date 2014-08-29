ActiveDrivers = new Meteor.Collection('activeDrivers');

ActiveDrivers.states = {
  WAITING: 'waiting',
  UNACKED: 'unacked',
  ACKED: 'acked'
}
Object.freeze(ActiveDrivers.states);

ActiveDrivers.allow({
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

ActiveDrivers.validate = function(data){
  var validator = ModelValidator(data);
  validator.checkNonEmpty('driverId');
  validator.checkNonEmpty('carId');
  return validator.getResponse();
};

Meteor.methods({
	/**
	* Active Driver
	*
	* Format of active driver attributes:
	* - driverId: driver represented
	* - carId: car that active driver is using
	* - status: waiting, unacked, or acked
	*		  waiting: whenever driver has no rides assigned
	*     unacked: whenever driver has rides and has his rides updated
	*     acked: driver has rides and has notified that he has seen everything
	* - comments: what driver should do upon completion
	* - rideIds: ids of rides driver has currently
	*
	* Location related attributes: 
  * - lastPingTime, lastLatitude, lastLongitude
	**/

	activeDriver: function(attributes){
		var activeDriver = _.defaults(attributes, {
      editing: false,
			rideIds:[],
			status: ActiveDrivers.states.WAITING,
      lastPingTime: null,
      lastLatitude: null,
      lastLongitude: null
		});

		var activeDriverId = ActiveDrivers.insert(activeDriver);
		return activeDriverId;
	},

  assignSelectedRides:function(driverId){
    var selectedRides = Rides.find({selected: true}).fetch();
    var selectedRideIds = selectedRides.map(function(selectedRide){return selectedRide._id});
    assignRides(selectedRideIds, driverId);
    return selectedRides;
  },

  unAssignRide: function(driverId, rideId){
    var ride = Rides.findOne(rideId);
    ActiveDrivers.update(driverId, {
      $set: {status: ActiveDrivers.states.UNACKED},
      $pull: {rideIds: rideId}
    });

    var driver = ActiveDrivers.findOne(driverId);
    onDriverUpdate(driver);

    Rides.update(rideId, {
      $set: {status: Rides.states.UNASSIGNED},
      $unset: {driver: ''}
    });
  },

  changeDoneMessage: function(driverId, newMessage){
    ActiveDrivers.update(driverId, {
      $set: {instruction: newMessage}
    });
  },

  setDriverStatus: function(driverId, state){
    ActiveDrivers.update(driverId, {
      $set: {status: state}
    });
  },

  completeTrip: function(driverId){
    var driver = ActiveDrivers.findOne(driverId);
    var assigned = Rides.find({_id: {$in: driver.rideIds}}).fetch();
    var isTripComplete = assigned.every(function(ride){
      return ride.status === Rides.states.FOUND || ride.status === Rides.states.NOT_FOUND;
    });
     
    if(isTripComplete){
      assigned.forEach(function(ride){
        if(ride.status === Rides.states.FOUND){
          Rides.update(ride._id, {$set: {status: Rides.states.COMPLETE_FOUND}});
        }
        if(ride.status === Rides.states.NOT_FOUND){
          Rides.update(ride._id, {$set: {status: Rides.states.COMPLETE_NOT_FOUND}});
        }
        ActiveDrivers.update(driverId, {
          $pull: {rideIds: ride._id}
        });
      });
      ActiveDrivers.update(driver._id, {
        $set: {status: ActiveDrivers.states.WAITING}
      });
    }
    return isTripComplete;
  }
});

	
//Private Helper Methods

/** Any checks that should occur whenever
* a driver has been changed **/
var onDriverUpdate = function(driver){
  if(driver.rideIds.length === 0){
    ActiveDrivers.update(driver._id, {
      $set: {status: ActiveDrivers.states.WAITING}
    });
  }
}

/** Assigns a list of rides to a driver **/
var assignRides = function(rideIds, driverId){
  var driver = ActiveDrivers.findOne(driverId);
  var rides = Rides.find({_id: {$in: rideIds}}).fetch();
  if(rides.length > 0){
    rides.forEach(function(ride){
      Rides.update(ride._id, {
        $set: {
          driver: driver,
          selected: false,
          status: Rides.states.ASSIGNED
        }
      });
    });

    ActiveDrivers.update(driver._id, {
      $set: {
        status: ActiveDrivers.states.UNACKED
      },
      $push: {
        rideIds: {$each: rideIds}
      }
    });
  }
}
