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

//Enums
Drivers.states = {
	WAITING: 'waiting',
	UNACKED: 'unacked',
	ACKED: 'acked'
}

Object.freeze(Drivers.states);

Meteor.methods({
  /** 
  * Format of driver attributes:
  * name: string
  * phone: (***)-(***)-(****)
  * capacity: max number of people who can fit in driver's car
  * passengers: number of people currently in a driver's car
	* status: waiting, unacked, or acked.
	*		waiting: whenever driver has no rides assigned.
	*		unacked: whenever driver has rides and has just had updated rides
	*		acked: 
  **/
  driver: function(attributes){
    var driver = _.defaults(_.extend(attributes, {
      capacity: parseInt(attributes.capacity)
    }), {
      rideIds: [],
      passengers: 0,
      name: undefined,
      phone: undefined,
      capacity: undefined,
      comments: undefined,
			status: Drivers.states.WAITING
    });

    var driverId = Drivers.insert(driver);

    return driverId;
   }
});
