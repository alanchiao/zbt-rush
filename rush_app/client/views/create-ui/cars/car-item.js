/**
* Meteor Blaze bug with respect to contenteditable.
* Refer to : https://github.com/meteor/meteor/issues/1964
* Fix is below with .rendered
**/

Template.carItem.rendered = function(){
	var t = this;
	this.contentAutorun = Deps.autorun(function(){
		var car =  Cars.findOne(t.data._id);
		if(car){
			t.findAll('[data-input=true]').forEach(function(field){
				field.innerHTML = car[$(field).attr('name')];
			});
		}
	});
};

Template.carItem.events({
  'click [data-js=delete]':function(e){
    if(confirm("Are you sure you want to delete " + this.name + "? Any driver using the car will become inactive and corresponding rides will be unassigned")){
      if(this.isAssigned == true){
        var activeDriver = ActiveDrivers.findOne({carId:this._id});
        activeDriver.rideIds.forEach(function(rideId){
          Meteor.call("unAssignRide", activeDriver._id, rideId, function(error){});
        });
        Drivers.update(activeDriver.driverId, {$set: {isAssigned:false}});
        ActiveDrivers.remove(activeDriver._id);
      }
      Cars.remove(this._id);
    }
  },
  'click [data-js=edit]':function(e){
    Cars.update(this._id, {$set:{editing: !this.editing}});
  },
  'submit form': function(e){
    e.preventDefault();
    var carDetails = formUtils.formToJson(e.target);
    Meteor.call("editCar", this._id, carDetails, function(error, response){
      if(response.isInputValid === true){
        jQueryUtils.flash(e.currentTarget.parentNode, '#aaddff');
      } else {
        alert('invalid edit');
        location.reload();
      }
    });
  }
});

Template.carItem.helpers({
  editingClass: function(){
    return this.editing && 'editing';
  }
});
