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

//Enums
Rides.states = {
	UNASSIGNED: 'unassigned',
	ASSIGNED: 'assigned',
	FOUND: 'found',
	NOT_FOUND: 'not found',
	COMPLETE_FOUND: 'complete found',
	COMPLETE_NOT_FOUND: 'complete not found'
};

Object.freeze(Rides.states);

Meteor.methods({
	/**
	* Attributes names can mostly be found under client/rick/ride-form.html
	* name: string
	* time: *:** AM or *:** PM
	* phone: string: (***)-***-****
	* pickup: string: location
	* dropoff: string: location
	* comments: string
	* driver: the driver that the ride belongs to, else undefined
	* editing: boolean: currently being edited by someone (any user) on UI or not 
	* selected: boolean: currently selected by someone (any user) on UI or not
	* status: enum: either unassigned, assigned, found, not_found, complete_found,
	* 	or complete_not_found. Unassigned/assigned are statuses that rick has control over. 
	* 	He adds rides and assigns them. Found/not_found/found_complete, complete_unfound
	*   are statuses that	the driver has control over. A ride is found and not_found if 
	*		they are the riders are actually found or not found.
	*		Once a driver has either found/not_found all the assigned rides, all the assigned 
	* 	rides become complete when he pressed the complete-trip button.
	*/
  ride: function(attributes){

    var ride = _.defaults(attributes, {
      driver: undefined,
      editing: false,
      selected: false,
      status: Rides.states.UNASSIGNED,

      name: undefined,
      time: undefined,
      phone: undefined,
      passengers: undefined,
      pickup: undefined,
      dropoff: undefined,
      comments: undefined
    });
    var rideId = Rides.insert(ride);

    return rideId;
  }
});

