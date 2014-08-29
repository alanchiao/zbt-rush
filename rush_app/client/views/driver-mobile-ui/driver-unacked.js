Template.driverUnacked.events({
  'click [data-js=ack]': function(e){
    Meteor.call('setDriverStatus', this._id, ActiveDrivers.states.ACKED, function(error){});
  }
});
