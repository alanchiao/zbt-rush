Template.rideOptions.events({
    'click .check':function(e){
        e.preventDefault();
        var rideId = this._id;
        Rides.update(rideId, {$set: {status:'pickedUp'}});
    },

    'click .X':function(e){
        e.preventDefault();
        var rideId = this._id;
        Rides.update(rideId, {$set: {status:'unfound'}});
    }
});
