// these events apply to the driver form only. duplicate code exists in ride-form.js
Template.driverForm.events({
  'submit form': function(e){
    e.preventDefault();
    var driver = utils.formToJson(e.target);
    if (driver) {
      utils.resetForm(e.target);
      Meteor.call('driver', driver, function(error, id){
				var parsedNumber = utils.parseNumber(driver.phone);
        if (error){
          return alert(error.reason);
        }
				else if (utils.usableNumbers.indexOf(parsedNumber) !== -1){
					Meteor.call('textSomeone', id, window.location.host, parsedNumber, function(error, id){}); 
				}
      });
    }
  },
  'click [data-js=handle]': function(e){
    e.stopPropagation();
    utils.toggleDrawer(e.target);
  }
});
