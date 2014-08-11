// these events apply to the ride form only. duplicate code exists in driver-form.js

Template.rideForm.events({
  'submit form': function(e){
    e.preventDefault();
    var ride = formUtils.formToJson(e.target);
    if (ride) {
      formUtils.resetForm(e.target);
      Meteor.call('ride', ride, function(error,id){
        if(error){
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

Template.rideForm.helpers({
  currentTime: function(){
    return utils.getCurrentTime();
  }
})
