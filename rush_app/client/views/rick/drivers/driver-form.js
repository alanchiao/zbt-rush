// these events apply to the driver form only. duplicate code exists in ride-form.js
Template.driverForm.events({
  'submit form': function(e){
    e.preventDefault();
    var driver = formUtils.formToJson(e.target);
    if (driver) {
      formUtils.resetForm(e.target);
      Meteor.call('driver', driver, function(error, id){
      	Cars.update(driver.car, {$set:{driver:Drivers.find(id).fetch()[0]}});
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

Template.driverForm.helpers({
	unAssignedCars: function(){
    return Cars.find({
      driver: null
    }).fetch();
	}
});
