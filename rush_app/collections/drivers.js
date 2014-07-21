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
  driver: function(attributes){
    var phoneNumber = attributes.phone;
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
    //Free to change to your own phone. Hardcoded.
    if(phoneNumber === '(978)-621-9636'){
      Meteor.call('textSomeone', driverId, function(error){});
    }

    return driverId;
   }
});
