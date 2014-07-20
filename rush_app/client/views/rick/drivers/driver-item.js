Template.driverItem.events({
  'click [data-js=delete]': function(e){
  	Drivers.remove(this._id);
  }
});
