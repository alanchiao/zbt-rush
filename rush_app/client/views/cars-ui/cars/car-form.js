Template.carForm.events({
  'submit form': function(e){
    e.preventDefault();
    var car = formUtils.formToJson(e.target);
		Meteor.call('car', car, function(error, response){
			if(error){alert(error.reason)};
			formUtils.onResponse(response, e.target);
		});
  }
});
