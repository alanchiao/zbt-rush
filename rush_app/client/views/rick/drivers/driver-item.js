Template.driverItem.events({
  'click [data-js=driver]': function(e){
    Meteor.call('assignSelectedRides', this._id, function(error, result){
      if(error){
        console.log(error);
      } else if (result.length > 0) {
        var textButton = $(e.target).parents('[data-js="driver"]').find('[data-js="text"]');
        textButton.text('Text');
        var handle = $(e.target).parents('[data-js="driver"]').find('[data-js="handle"]');
        var drawer = $(e.target).parents('[data-js="driver"]').find('[data-js="additional-info"]');
        jQueryUtils.showDrawer(handle, drawer);
      }
    });
  },
  'click [data-js=delete]': function(e){
    e.stopPropagation();
    if (confirm("Are you sure you want to delete " + this.name + "? If he or she has any rides, they will be unassigned.")) {
      Cars.update(this.carId, {$set: {driver:null}});
      this.rideIds.forEach(function(rideId){
        Meteor.call("unAssignRide", this._id, rideId, function(error){});
      }.bind(this));
      Drivers.remove(this._id);
    }
  },
  'click [data-js=handle]': function(e){
    e.stopPropagation();
    var handle = $(e.target);
    var drawer = handle.parents('[data-js="driver"]').find('[data-js="additional-info"]');
    jQueryUtils.toggleDrawer(handle, drawer);
  },
  'click [data-js=text]':function(e){
    e.stopPropagation();
    var phoneNumber = this.phone;
    var parsedNumber = utils.parsePhoneNumber(phoneNumber);
    $(e.target).text('Texting...');
    Meteor.call('sendText', this._id, window.location.host, parsedNumber, function(error, id){
      if(error){
        $(e.target).text('Failure!');
        console.log(error);
      } else {
        $(e.target).text('Sent!');
      }
    });
  }
});

Template.driverItem.helpers({
  listRides: function(){
    return this.rideIds.map(function(rideId){return Rides.findOne(rideId)});
  },
  overfilled: function(){
		var car = Cars.findOne(this.carId);
    return (this.passengers > car.capacity) ? 'overfilled' : '';
  },
  textable: function(){
    var parsedNumber = utils.parsePhoneNumber(this.phone);
    return libFixtures.usableNumbers.indexOf(parsedNumber) !== -1;
  },
	carCapacity: function(){
		return Cars.findOne(this.carId).capacity;
	},
	carName: function(){
		return Cars.findOne(this.carId).name;
	},
  unAssignedCars: function(){
    return Cars.find();
  },
  makeOption: function(carId){
    var result = '<option value="' + this._id + '"';
    if (carId == this._id) {
      result += ' selected="selected"'
    }
    result += '>' + this.name + '</option>';
    return new Handlebars.SafeString(result);
  }
	
});
