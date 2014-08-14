Template.driverAcked.helpers({
  assignedRides: function(){
    return Rides.find({_id: {$in: this.rideIds}}).fetch();
  }
});

Template.driverAcked.events({
  'click [data-js=complete-trip]':function(e){
    Meteor.call('completeTrip', this._id, function(error, isComplete){
      if(!isComplete){
        alert("Please indicate the status of each ride.");
      }
    });
  }
});
