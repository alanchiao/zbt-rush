Template.carForm.events({
	'submit form': function(e){
		e.preventDefault();
		console.log(e.target);
		var car = formUtils.formToJson(e.target);
		console.log(car);
		if(car){
			formUtils.resetForm(e.target);
			Meteor.call('car', car, function(error, id){});
		};
	}
});
