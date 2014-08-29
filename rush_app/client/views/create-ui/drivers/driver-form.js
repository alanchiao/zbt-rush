// these events apply to the driver form only. duplicate code exists in ride-form.js
Template.driverForm.events({
  'submit form': function(e){
    e.preventDefault();
    var driver = formUtils.formToJson(e.target);
	Meteor.call('driver', driver, function(error, response){
		if (error){return alert(error.reason);}
		formUtils.onResponse(response, e.target);
	});
  }
});
