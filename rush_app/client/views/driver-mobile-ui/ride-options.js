Template.rideOptions.events({
  'click [data-js=found]':function(e){
    e.preventDefault();
    var rideId = this._id;
    Rides.update(rideId, {$set: {status: Rides.states.FOUND}});
  },

  'click [data-js=not-found]':function(e){
    e.preventDefault();
    var rideId = this._id;
    Rides.update(rideId, {$set: {status: Rides.states.NOT_FOUND}});
  }
});
