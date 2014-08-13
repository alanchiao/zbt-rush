Template.driver.helpers({
  assignedRides: function(){
    var rideList = this.rideIds;
    return Rides.find({_id: {$in: rideList}}).fetch();
  },
  currDriverId: function(){
    return Driver.findOne().fetch()[0]._id;
  }
});

Template.driver.events({
  'click [data-js=complete-trip]':function(e){
    var assigned = Rides.find({
      status: {
        $in: [
          Rides.states.ASSIGNED,
          RIDES.states.FOUND,
          Rides.states.NOT_FOUND
        ]
      }
    }).fetch();

    var isRideComplete = assigned.every(function(ride){
      return ride.status === Rides.states.FOUND || ride.status === Rides.states.NOT_FOUND;
    });
     
    if(isRideComplete){
      assigned.forEach(function(ride){
				if(ride.status === Rides.states.FOUND) {
        	Rides.update(ride._id, {$set: {status: Rides.states.COMPLETE_FOUND}});
        }
				if(ride.status === Rides.states.NOT_FOUND) {
					Rides.update(ride._id, {$set: {status: Rides.states.COMPLETE_NOT_FOUND}});
        }
      });
    } else {
      alert("Ride is actually not complete");
    }
  }
});
