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
    var handle = $(e.target);
    var drawer = $('body').find('[data-js="ride-form"]');
    jQueryUtils.toggleDrawer(handle, drawer);
  }
});

Template.rideForm.helpers({
  currentTime: function(){
    return utils.getCurrentTime();
  }
})
