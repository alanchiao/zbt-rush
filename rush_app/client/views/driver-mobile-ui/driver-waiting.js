Template.driverWaiting.helpers({
  whenDone: function(){
  	var defaultMessage = "Thanks for driving, " + this.name + "! Nothing to do yet.";
    return this.instruction ? this.instruction : defaultMessage;
  },
});
