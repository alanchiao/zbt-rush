Template.driverWaiting.helpers({
  whenDone: function(){
    if(false){
      return 'Please await further actions';
    } else {
      return "Thanks for driving, " + this.name + "! Nothing to do yet.";
    }
  }
});
