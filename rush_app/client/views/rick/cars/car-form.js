Template.carForm.events({
  'submit form': function(e){
    e.preventDefault();
    var car = formUtils.formToJson(e.target);
    if(car){
      formUtils.resetForm(e.target);
      Meteor.call('car', car, function(error, id){});
    };
  }
});
