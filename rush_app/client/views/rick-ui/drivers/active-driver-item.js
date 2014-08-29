Template.activeDriverItem.rendered = function(){
	var t = this;
	this.contentAutorun = Deps.autorun(function(){
		var driver = ActiveDrivers.findOne(t.data._id);
		if(driver && driver.editing !== true){
			t.findAll('[name="instruction"]').forEach(function(field){
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
    if (confirm("Deactivate " + driver.name + "? Any assigned rides will be put back in the queue.")) {
      Cars.update(this.carId, {$set: {isAssigned:false}});
      this.rideIds.forEach(function(rideId){
        Meteor.call("unAssignRide", this._id, rideId, function(error){});
      }.bind(this));
			Drivers.update(this.driverId, {$set: {isAssigned:false}});
      ActiveDrivers.remove(this._id);
    }
  },
  'click [data-js=edit]':function(e){
    e.stopPropagation();
    var item = $(e.target).closest('form').get(0);
    if (this.editing) {
      utils.resetItem(item);
    } else {
      utils.resetItem(item, {default: true});
    }

    ActiveDrivers.update(this._id, {$set:{editing: !this.editing}});
  },
  'submit form': function(e){
    e.preventDefault();
    var newDoneMessage = formUtils.formToJson(e.target).instruction;
    Meteor.call("changeDoneMessage", this._id, newDoneMessage, function(error, response){
      jQueryUtils.flash(e.currentTarget.parentNode, '#aaddff');
    });
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
  driverPassengers: function(){
    var rides = Rides.find({_id: {$in: this.rideIds}});
    var totalPassengers = 0;
    rides.forEach(function(ride){
      totalPassengers += ride.passengers;
    })
    return totalPassengers;
  },
  unAssignedCars: function(){
    return Cars.find();
  },
  editingClass: function(){
    return this.editing && 'editing';
  }
});
