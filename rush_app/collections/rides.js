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
  ride: function(attributes){
    // editing (Boolean): currently being edited?
    // selected (Boolean): currently a selected item?
    // assigned (Boolean): currently assigned to a driver?

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

