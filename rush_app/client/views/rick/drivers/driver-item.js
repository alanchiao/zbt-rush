Template.driverItem.helpers({
  phoneNumber: function(){
    var phoneId = this.phone;
    var phone = Phones.findOne(phoneId);
    return phone['phone'];
  },

  listRides: function(){
    return this.rideIds.map(function(rideId){return Rides.findOne(rideId)});
  }
});

Template.driverItem.events({
  'click [data-js=driver]': function(e){
    var totalPassengers = 0;
    var selectedRides = Rides.find({selected: true}).fetch();

    selectedRides.forEach(function(selectedRide){
      totalPassengers += selectedRide.passengers;
      Rides.update(selectedRide._id, {
        $set: {
          driver: this,
          selected: false,
          status: 'assigned'
        }
      });
    }.bind(this));

    Drivers.update(this._id, {
      $push: {
        rideIds: {
          $each: selectedRides.map(function(selectedRide){return selectedRide._id})
        }
      },
      $inc: {
        passengers: totalPassengers
      }
    });
  },    
  'click [data-js=delete]': function(e){
  	Drivers.remove(this._id);
  }
});
