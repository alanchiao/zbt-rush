Drivers = new Meteor.Collection('drivers');

Drivers.states = {
  WAITING: 'waiting',
  UNACKED: 'unacked',
  ACKED: 'acked'
}
Object.freeze(Drivers.states);

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
  * name: string
  * phone: (***)-(***)-(****)
  * carId: id of this driver's car
  * passengers: number of people currently in a driver's car
  * status: waiting, unacked, or acked.
  *     waiting: whenever driver has no rides assigned.
  *     unacked: whenever driver has rides and has just had updated rides
  *     acked: 
  **/
  driver: function(attributes){
    var driver = _.defaults(attributes, {
      rideIds: [],
      passengers: 0,
      name: undefined,
      phone: undefined,
      carId: undefined,
      capacity: undefined,
      comments: undefined,
      status: Drivers.states.WAITING
    });

    var driverId = Drivers.insert(driver);
    return driverId;
  },

  assignSelectedRides:function(driverId){
    var selectedRides = Rides.find({selected: true}).fetch();
    var selectedRideIds = selectedRides.map(function(selectedRide){return selectedRide._id});
    assignRides(selectedRideIds, driverId); 
  },

  unAssignRide:function(driverId, rideId){
    var ride = Rides.findOne(rideId);
    Drivers.update(driverId, {
      $set: {status: Drivers.states.UNACKED},
      $pull: {rideIds: rideId},
      $inc: {passengers: -ride.passengers}
    });

    var driver = Drivers.findOne(driverId);
    onDriverUpdate(driver);

    Rides.update(rideId, {
      $set: {status: Rides.states.UNASSIGNED},
      $unset: {driver: ''}
    });
  },

  setDriverStatus: function(driverId, state){
    Drivers.update(driverId, {
      $set: {status: state}
    });
  },

  completeTrip: function(driverId){
    var driver = Drivers.findOne(driverId);
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
        Drivers.update(driverId, {
          $pull: {rideIds: ride._id},
          $inc: {passengers: -ride.passengers}
        });
      });
      Drivers.update(driver._id, {
        $set: {status: Drivers.states.WAITING}
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
    Drivers.update(driver._id, {
      $set: {status: Drivers.states.WAITING}
    });
  }
}

/** Assigns a list of rides to a driver **/
var assignRides = function(rideIds, driverId){
  var driver = Drivers.findOne(driverId);
  var rides = Rides.find({_id: {$in: rideIds}}).fetch();
  var totalPassengers = 0;
  if(rides.length > 0){
    rides.forEach(function(ride){
      totalPassengers += ride.passengers;
      Rides.update(ride._id, {
        $set: {
          driver: driver,
          selected: false,
          status: Rides.states.ASSIGNED
        }
      });
    });

    Drivers.update(driver._id, {
      $set: {
        status: Drivers.states.UNACKED
      },
      $push: {
        rideIds: {$each: rideIds}
      },
      $inc: {
        passengers: totalPassengers
      }
    });
  }
}
