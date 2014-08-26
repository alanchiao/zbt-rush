// these events apply to the driver form only. duplicate code exists in ride-form.js
Template.activeDriverForm.events({
  'submit form': function(e){
    e.preventDefault();
    var activeDriver = formUtils.formToJson(e.target);
    if (activeDriver) {
      formUtils.resetForm(e.target);
      Meteor.call('activeDriver', activeDriver, function(error, id){
        Cars.update(activeDriver.carId, {$set:{isAssigned: true}});
				Drivers.update(activeDriver.driverId, {$set:{isAssigned: true}});
        if (error){
          return alert(error.reason);
        }
      });
    }
  },
  'click [data-js=handle]': function(e){
    e.stopPropagation();
    var handle = $(e.target);
    var drawer = $('body').find('[data-js="driver-form"]');
    jQueryUtils.toggleDrawer(handle, drawer);
  }
});

Template.activeDriverForm.helpers({
	unAssignedCars: function(){
    return Cars.find({
      isAssigned:false
    }).fetch();
	},
	unAssignedDrivers:function(){
		return Drivers.find({
			isAssigned: false
		}).fetch();
	}
});
