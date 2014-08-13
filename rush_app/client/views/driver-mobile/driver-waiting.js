Template.driverWaiting.helpers({
  whenDone: function(){
    if(this.comments !== ''){
      return this.comments;
    } else {
      return "Thanks for driving, " + this.name + "! Nothing to do yet.";
    }
  }
});
