Template.driver.helpers({
  assignedRides: function(){
    var rideList = this.rideIds;
    return Rides.find({_id: {$in: rideList}}).fetch();
  }
});

Template.driver.events({
  'click [data-js=complete-trip]':function(e){
		//Should disable complete-trip button until no rides lift to take care of.
    var isRideComplete = true;
    var assigned = Rides.find({status: {$in: [Rides.states.ASSIGNED, RIDES.states.FOUND, 
			Rides.states.NOT_FOUND]}}).fetch();
    assigned.forEach(function(entry){
      if(entry.status !== Rides.states.FOUND &&  entry.status !== RIDES.states.NOT_FOUND){
         isRideComplete = false;
      }
    }); 
     
    if(isRideComplete){
      assigned.forEach(function(entry){
				if(entry.status === Rides.states.FOUND)
        	Rides.update(entry._id, {$set: {status: Rides.states.COMPLETE_FOUND}});
				if(entry.status === Rides.states.NOT_FOUND)
					Rides.update(entry._id, {$set: {status: Rides.states.COMPLETE_NOT_FOUND}});
      });
    }
    else {
      alert("Ride is actually not complete");
    }
  }
});
