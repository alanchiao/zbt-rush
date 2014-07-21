Template.rideOptions.events({
  'click [data-js=pickedup]':function(e){
    e.preventDefault();
    var rideId = this._id;
    Rides.update(rideId, {$set: {status:'pickedUp'}});
  },

  'click [data-js=unfound]':function(e){
    e.preventDefault();
    var rideId = this._id;
    Rides.update(rideId, {$set: {status:'unfound'}});
  }
});
