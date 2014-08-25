Template.driverAcked.helpers({
  assignedRides: function(){
    return Rides.find({_id: {$in: this.rideIds}}).fetch();
  },
  statusClass: function(){
    return this.status === Rides.states.FOUND && 'status-found' ||
      this.status === Rides.states.NOT_FOUND && 'status-not-found';
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
