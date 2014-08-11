// these events apply to the driver form only. duplicate code exists in ride-form.js
Template.driverForm.events({
  'submit form': function(e){
    e.preventDefault();
    var driver = formUtils.formToJson(e.target);
    if (driver) {
      utils.resetForm(e.target);
      Meteor.call('driver', driver, function(error, id){
				var parsedNumber = utils.parsePhoneNumber(driver.phone);
        if (error){
          return alert(error.reason);
        }
      });
    }
  },
  'click [data-js=handle]': function(e){
    e.stopPropagation();
    jQueryUtils.toggleDrawer(e.target);
  }
});
