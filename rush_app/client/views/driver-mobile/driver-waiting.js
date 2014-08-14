Template.driverWaiting.helpers({
  whenDone: function(){
  	var defaultMessage = "Thanks for driving, " + this.name + "! Nothing to do yet.";
    return this.comments ? this.comments : defaultMessage;
  }
});
