Template.rideItem.events({
  'click [data-js=ride]': function(e){
    if (!this.driver && !this.editing) {
      Rides.update(this._id, {$set:{selected: !this.selected}});
    }
  },
  'click [data-js=handle]': function(e){
    e.stopPropagation();
    utils.toggleDrawer(e.target);
  },
  'click [data-js=unassign]': function(e){
    e.stopPropagation();
    Drivers.update(this.driver._id, {
      $pull: {
        rideIds: this._id
      },
      $inc: {
        passengers: -this.passengers
      }
    });
    Rides.update(this._id, {
      $set: {
        status: 'unassigned'
      },
      $unset: {
        driver: ''
      }
    });
  },
  'click [data-js=delete]': function(e){
    e.stopPropagation();
    if (confirm("Are you sure you want to delete " + this.name + "'s ride request?")) {
      Rides.remove(this._id);
    }
  },
  'click [data-js="edit"]': function(e){
    e.stopPropagation();
    if (this.selected) {
      Rides.update(this._id, {$set: {selected: false}});
    }
    var item = $(e.target).closest('form').get(0);
    if (this.editing) {
      utils.resetItem(item);
    } else {
      utils.resetItem(item, {default: true});
    }
    
    Rides.update(this._id, {$set:{editing: !this.editing}});
  },
  'submit form': function(e){
    e.preventDefault();
    var options = utils.formToJson(e.target);
    if (this.driver) {
      Drivers.update(this.driver._id, {
        $inc: {
          passengers: options.passengers - this.passengers
        }
      });
    }
    Rides.update(this._id, {$set:options}, {}, function(error){
      if (!error) {
        utils.flash(e.currentTarget.parentNode, '#aaddff');
      }
    });
  }
});

Template.rideItem.helpers({
  isEditing: function(){
    return this.editing ? 'editing' : '';
  },
  isSelected: function(){
    return this.selected ? 'selected' : '';
  },
  formattedTime: function(){
    var today = new Date().toDateString();
    var rideDate = new Date(this.time).toDateString();
    var rideHourMin = this.time.split('T')[1];
    var dateString = rideDate.split(' ').splice(1, 2).join(' ').replace(/^0/, '');

    return (rideDate == today) ? rideHourMin : dateString + ', ' + rideHourMin;
  }
});

