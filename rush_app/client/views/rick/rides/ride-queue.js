Template.rideQueue.helpers({
  unAssignedRides: function(){
    return Rides.find({
      status: 'unassigned'
    }, {
      sort: ['time']
    });
  }
});

