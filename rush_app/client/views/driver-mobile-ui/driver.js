Template.driver.helpers({
  isDriverWaiting: function(){
    return this.status === ActiveDrivers.states.WAITING;
  },
  isDriverUnacked: function(){
    return this.status === ActiveDrivers.states.UNACKED;
  },
  isDriverAcked: function(){
    return this.status === ActiveDrivers.states.ACKED;
  }
});
