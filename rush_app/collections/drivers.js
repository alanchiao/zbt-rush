Drivers = new Meteor.Collection('drivers');
CollectionHandler.addCollection('Drivers', Drivers, {'phone': Phones});


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
      phone: Phones.insert({'phone': phoneNumber}),
      capacity: parseInt(attributes.capacity)
    }), {
      rides: [],
      passengers: 0,

      name: undefined,
      phone: undefined,
      capacity: undefined,
      comments: undefined
    });


    var driverId = Drivers.insert(driver);
    //TEST: Using only my phone for now. Feel
    //free to change to your own phone.
    if(phoneNumber === '(978)-621-9636'){
      Meteor.call('textSomeone', driverId, function(error){});
    }
    console.log(driver);

    return driverId;
   }
});
