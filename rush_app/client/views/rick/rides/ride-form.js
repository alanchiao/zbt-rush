// these events apply to the ride form only. duplicate code exists in driver-form.js

Template.rideForm.events({
  'submit form': function(e){
  e.preventDefault();
  var ride = utils.formToJson(e.target);
  var time = ride['time'];
   
  Meteor.call('ride', ride, function(error,id){
    if(error){
    return alert(error.reason);
    }
  });
  }
});

