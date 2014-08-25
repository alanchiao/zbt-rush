// these events apply to the driver form only. duplicate code exists in ride-form.js
Template.driverForm.events({
  'submit form': function(e){
    e.preventDefault();
    var driver = formUtils.formToJson(e.target);
		formUtils.resetForm(e.target);
		Meteor.call('driver', driver, function(error, response){
			if (error){
				return alert(error.reason);
			}
			else if (response.isValidInput === false){
		    //Utils.flashError(response.invalidInputs)		
			}
		});
  },
  'click [data-js=handle]': function(e){
		console.log("hello");
    e.stopPropagation();
    var handle = $(e.target);
    var drawer = $('body').find('[data-js="driver-form"]');
    jQueryUtils.toggleDrawer(handle, drawer);
  }
});
