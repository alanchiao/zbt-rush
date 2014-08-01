Template.driverItem.helpers({
  listRides: function(){
		/**
		console.log(this.rideIds);		
		**/
    return this.rideIds.map(function(rideId){return Rides.findOne(rideId)});
  },
	textable: function(){
		var parsedNumber = utils.parseNumber(this.phone);
		if (utils.usableNumbers.indexOf(parsedNumber) !== -1){
			return true;
		}
		return false;
	}
});

//Should eventually be moved back to server-side for most part.
Template.driverItem.events({
  'click [data-js=driver]': function(e){
    var totalPassengers = 0;
    var selectedRides = Rides.find({selected: true}).fetch();
    if (selectedRides.length > 0) {
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
      }, {}, function(error){
        if (!error) {
          utils.flash(e.currentTarget, '#99ff99');
        }
      });
    }
  },    
  'click [data-js=delete]': function(e){
  	Drivers.remove(this._id);
  },
  'click [data-js=handle]': function(e){
      e.stopPropagation();
      utils.toggleDrawer(e.target);
  },
	'click [data-js=text]':function(e){
		var phoneNumber = this.phone;
		var parsedNumber = utils.parseNumber(phoneNumber);
		Meteor.call('textSomeone', this._id, window.location.host, parsedNumber, function(error, id){});
	}
});
