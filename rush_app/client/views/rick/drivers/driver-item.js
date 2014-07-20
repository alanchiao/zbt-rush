
Template.driverItem.helpers({
  phoneNumber: function(){
    var phoneId = this.phone;
    var phone = Phones.findOne(phoneId);
    return phone['phone'];
  }
});

Template.driverItem.events({
  'click [data-js=delete]': function(e){
  	Drivers.remove(this._id);
  }
});
