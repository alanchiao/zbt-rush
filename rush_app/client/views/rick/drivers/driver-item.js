Template.driverItem.helpers({
  listRides: function(){
    return this.rideIds.map(function(rideId){return Rides.findOne(rideId)});
  },
  overfilled: function(){
    return (this.passengers > this.capacity) ? 'overfilled' : '';
  },
  textable: function(){
    var parsedNumber = utils.parsePhoneNumber(this.phone);
    return libFixtures.usableNumbers.indexOf(parsedNumber) !== -1;
  }
});

//Should eventually be moved back to server-side for most part.
Template.driverItem.events({
  'click [data-js=driver]': function(e){
    Meteor.call('assignSelectedRides', this._id, function(error){});
  },  
  'click [data-js=delete]': function(e){
    Drivers.remove(this._id);
  },
  'click [data-js=handle]': function(e){
    e.stopPropagation();
    jQueryUtils.toggleDrawer(e.target);
  },
  'click [data-js=text]':function(e){
    var phoneNumber = this.phone;
    var parsedNumber = utils.parsePhoneNumber(phoneNumber);
    Meteor.call('textSomeone', this._id, window.location.host, parsedNumber, function(error, id){});
  }
});
