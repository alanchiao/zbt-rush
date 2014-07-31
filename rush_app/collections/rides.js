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
	* status: string: either unassigned, assigned, pickedUp, unfound, or complete 
	* unassigned/assigned are statuses that rick has control over. 
	* 	He adds rides and assigns them. pickedUp/unfound/complete are statuses that
	*		the driver has control over. A ride is pickedUp if they are pickedUp and
	*   the opposite for unfound. Once a driver has either pickedUp/cannot find
	*		all the assigned rides, all the assigned rides become complete when
	*   he pressed the complete-trip button.
	*/
  ride: function(attributes){

    var ride = _.defaults(attributes, {
      driver: undefined,
      editing: false,
      selected: false,
      status: 'unassigned',

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

