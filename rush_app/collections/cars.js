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
  * name
  * description
  * capacity
  * allowedDrivers
  * lastPingTime, lastLatitude, lastLongitude
  **/
  car: function(attributes){

    var car = _.defaults(_.extend(attributes, {
      capacity: parseInt(attributes.capacity)
    }), {
      allowedDrivers: [],
      lastPingTime: null,
      lastLatitude: null,
      lastLongitude: null,
      editing: false,

      name: undefined,
      description: undefined
    });

    var carId = Cars.insert(car);
    return carId;
  },

  updateLocation: function(carId, latitude, longitude){
  }
});

