Template.driverWaiting.helpers({
  whenDone: function(){
  	var defaultMessage = "Thanks for driving, " + Drivers.findOne(this.driverId).name + "! Nothing to do yet.";
    return this.instruction ? this.instruction : defaultMessage;
  },
});
