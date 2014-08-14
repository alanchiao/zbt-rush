Template.driver.helpers({
  isDriverWaiting: function(){
    return this.status === Drivers.states.WAITING;
  },
  isDriverUnacked: function(){
    return this.status === Drivers.states.UNACKED;
  },
  isDriverAcked: function(){
    return this.status === Drivers.states.ACKED;
  }
});
