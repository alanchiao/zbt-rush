Template.rideItem.helpers({
  phoneNumber: function(){
    var phoneId = this.phone;
    var phone = Phones.findOne(phoneId);
    return phone['phone'];
  }
});

Template.rideItem.events({
  'click [data-js=ride]': function(e){
    Rides.update(this._id, {$set:{selected: !this.selected}});
  },
  'click [data-js=delete]': function(e){
    Rides.remove(this._id);
  },
  'click [data-js="edit"]': function(e){
    e.stopPropagation();
    Rides.update(this._id, {$set:{editing: !this.editing}});
  },
  'submit form': function(e){
    e.preventDefault();
    var options = utils.formToJson(e.target);
    Rides.update(this._id, {$set:options});
  }
});
