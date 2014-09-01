Template.rideQueue.helpers({
  unAssignedRides: function(){
    return Rides.find({
      status: Rides.states.UNASSIGNED
    }, {
      sort: {'time':1, 'name':1}
    });
  }
});

