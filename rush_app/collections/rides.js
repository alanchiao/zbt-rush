Rides = new Meteor.Collection("rides");

Rides.allow({
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

Rides.states = {
	UNASSIGNED: 'unassigned',
	ASSIGNED: 'assigned',
	FOUND: 'found',
	NOT_FOUND: 'not found',
	COMPLETE_FOUND: 'complete found',
	COMPLETE_NOT_FOUND: 'complete not found'
};
Object.freeze(Rides.states);

Rides.validate = function(data){
	var validator = ModelValidator(data);
	validator.checkNonEmpty('name');
	validator.checkNonEmpty('phone');
	validator.checkNonEmpty('pickup');
	validator.checkPositiveNumber('passengers');
	return validator.getResponse();
}

Meteor.methods({
	/**
	* Create ride
	*
	* Format of ride attributes:
	* - name: string
	* - time: *:** AM or *:** PM
	* - phone: string: (***)-***-****
	* - passengers
	* - pickup: string: location
	* - dropoff: string: location
	* - comments: string
	* - driver: the driver that the ride belongs to, else undefined
	* - status: enum: either unassigned, assigned, found, not_found, complete_found,
	* 	  or complete_not_found. Unassigned/assigned are statuses that rick has control over. 
	* 	  He adds rides and assigns them. Found/not_found/found_complete, complete_unfound
	*     are statuses that	the driver has control over. A ride is found and not_found if 
	*		  they are the riders are actually found or not found.
	*		  Once a driver has either found/not_found all the assigned rides, all the assigned 
	* 	  rides become complete when he pressed the complete-trip button.
	*
	* UI-Related attributes:
	* - editing: boolean: currently being edited by someone (any user) on UI or not 
	* - selected: boolean: currently selected by someone (any user) on UI or not
	*/
  ride: function(attributes){
    var ride = _.defaults(attributes, {
      driver: undefined,
      editing: false,
      selected: false,
      status: Rides.states.UNASSIGNED,
    });
		var response = Rides.validate(ride);
		if(response.isInputValid === true){
			response.rideId = Rides.insert(ride);
    }
    return response;
  },
	
	editRide: function(rideId, attributes){
		var response = Rides.validate(attributes);
		if(response.isInputValid === true){
			var ride = Rides.findOne(rideId);

			if(ride.driver){
				Drivers.update(ride.driver._id, {
					$inc: {
						passengers: attributes.passengers - ride.passengers
					}
				});
			}

			Rides.update(rideId, {$set: attributes}, {}, function(error){
				if(error){throwError(error.reason)};
			});
		}
		return response;		
	}
});

