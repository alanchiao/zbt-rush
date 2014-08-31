// these events apply to the ride form only. duplicate code exists in driver-form.js

Template.rideForm.events({
  'submit form': function(e){
    e.preventDefault();
    var ride = formUtils.formToJson(e.target);
		Meteor.call('ride', ride, function(error, response){
			if(error){alert(error.reason)};
			formUtils.onResponse(response, e.target);
    });
  },
	'click [data-js=handle]': function(e){
    e.stopPropagation();
    var handle = $(e.target);
    var drawer = $('body').find('[data-js="ride-form"]');
    jQueryUtils.toggleDrawer(handle, drawer);
  },
  'click #current-time-button': function(e) {
    e.preventDefault();
    $('[data-js=ride-form] input[name=time]').val(utils.getCurrentTime());
    $('[data-js=ride-form] input[name=phone]').focus();
  },
  'keypress form input': function(e) {
    if (e.which === 13 || e.keyCode === 13) {
      e.preventDefault();
      $(e.target).parents('form').submit();
    }
  }
});

Template.rideForm.helpers({
  currentTime: function(){
    return utils.getCurrentTime();
  }
});
