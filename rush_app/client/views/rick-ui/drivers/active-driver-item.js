Template.activeDriverItem.rendered = function(){
	var t = this;
	this.contentAutorun = Deps.autorun(function(){
		var driver = ActiveDrivers.findOne(t.data._id);
		if(driver){
			t.findAll('[data-input=true]').forEach(function(field){
				field.innerHTML = driver[$(field).attr('name')];
			});
		}
	});
};

Template.activeDriverItem.events({
  'click [data-js=driver]': function(e){
    Meteor.call('assignSelectedRides', this._id, function(error, result){
      if(error){
        console.log(error);
      } else if (result.length > 0) {
        var textButton = $(e.target).parents('[data-js="driver"]').find('[data-js="text"]');
        textButton.text('Text');
        textButton.show();
        var handle = $(e.target).parents('[data-js="driver"]').find('[data-js="handle"]');
        var drawer = $(e.target).parents('[data-js="driver"]').find('[data-js="additional-info"]');
        jQueryUtils.showDrawer(handle, drawer);
      }
    });
  },
  'click [data-js=delete]': function(e){
    e.stopPropagation();
		var driver = Drivers.findOne(this.driverId);
    if (confirm("Are you sure you want to deactivate " + driver.name + "? If he or she has any rides, they will be unassigned.")) {
      Cars.update(this.carId, {$set: {isAssigned:false}});
      this.rideIds.forEach(function(rideId){
        Meteor.call("unAssignRide", this._id, rideId, function(error){});
      }.bind(this));
			Drivers.update(this.driverId, {$set: {isAssigned:false}});
      ActiveDrivers.remove(this._id);
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
    if (!$(e.target).data('disabled')) {
      $(e.target).data('disabled', 'disabled');
      window.setTimeout(function(){
        $(e.target).removeData('disabled');
      }, 500);

  		var driver = Drivers.findOne(this.driverId);
      var parsedNumber = utils.parsePhoneNumber(driver.phone);
      $(e.target).text('Texting...');
      var text = 'Your rides have been updated.\n' + 'http://' + window.location.host + '/drivers/' + this.driverId;
      Meteor.call('sendText', text, parsedNumber, function(error, id){
        if(error){
          $(e.target).text('Failure!');
          console.log(error);
        } else {
          $(e.target).text('Sent!');
          $(e.target).fadeOut();
        }
      });
    }
  }
});

Template.activeDriverItem.helpers({
  listRides: function(){
    return this.rideIds.map(function(rideId){return Rides.findOne(rideId)});
  },
  overfilled: function(){
		var car = Cars.findOne(this.carId);
    return (this.passengers > car.capacity) ? 'overfilled' : '';
  },
  textable: function(){
		var phone = Drivers.findOne(this.driverId).phone;
    var parsedNumber = utils.parsePhoneNumber(phone);
    return libFixtures.usableNumbers.indexOf(parsedNumber) !== -1;
  },
	carCapacity: function(){
		return Cars.findOne(this.carId).capacity;
	},
	carName: function(){
		return Cars.findOne(this.carId).name;
	},
	driverName: function(){
		return Drivers.findOne(this.driverId).name;
	},
	driverPhone: function(){
		return Drivers.findOne(this.driverId).phone;
	},
  unAssignedCars: function(){
    return Cars.find();
  }
	
});
