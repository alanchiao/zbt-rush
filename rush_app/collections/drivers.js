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
  * Format of driver attributes:
  * name: string
  * phone: (***)-(***)-(****)
  * capacity: max number of people who can fit in driver's car
  * passengers: number of people currently in a driver's car
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
      comments: undefined
    });

    var driverId = Drivers.insert(driver);

    return driverId;
   }
});
