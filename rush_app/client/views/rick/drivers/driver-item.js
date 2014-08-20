Template.driverItem.events({
  'click [data-js=driver]': function(e){
    Meteor.call('assignSelectedRides', this._id, function(error){
      if(error){
        // handle it!
      } else {
        var handle = $(e.target).parents('[data-js="driver"]').find('[data-js="handle"]');
        var drawer = $(e.target).parents('[data-js="driver"]').find('[data-js="additional-info"]');
        jQueryUtils.toggleDrawer(handle, drawer);
      }
    });
  },  
  'click [data-js=delete]': function(e){
    Drivers.remove(this._id);
  },
  'click [data-js=handle]': function(e){
    e.stopPropagation();
    var handle = $(e.target);
    var drawer = handle.parents('[data-js="driver"]').find('[data-js="additional-info"]');
    jQueryUtils.toggleDrawer(handle, drawer);
  },
  'click [data-js=text]':function(e){
    var phoneNumber = this.phone;
    var parsedNumber = utils.parsePhoneNumber(phoneNumber);
    $(e.target).text('Texting...');
    Meteor.call('sendText', this._id, window.location.host, parsedNumber, function(error, id){
      if(error){
        $(e.target).text('Failure!');
        console.log(error);
      } else {
        $(e.target).text('Success!');
        window.setTimeout(function(){
          $(e.target).text('Text');
        }, 1000);
      }
    });
  }
});

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
