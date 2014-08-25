Template.rideItem.events({
  'click [data-js=ride]': function(e){
    if (!this.driver && !this.editing) {
      Rides.update(this._id, {$set:{selected: !this.selected}});
    }
  },
  'click [data-js=handle]': function(e){
    e.stopPropagation();
    var handle = $(e.target);
    var drawer = handle.parents('[data-js="ride"]').find('[data-js="additional-info"]');
    jQueryUtils.toggleDrawer(handle, drawer);
  },
  'click [data-js=unassign]': function(e){
    e.stopPropagation();
		Meteor.call("unAssignRide", this.driver._id, this._id, function(error){});
  },
  'click [data-js=delete]': function(e){
    e.stopPropagation();
    if (confirm("Are you sure you want to delete " + this.name + "'s ride request?")) {
      Rides.remove(this._id);
    }
  },
  'click [data-js=edit]': function(e){
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
    var options = formUtils.formToJson(e.target);
    if (this.driver) {
      Drivers.update(this.driver._id, {
        $inc: {
          passengers: options.passengers - this.passengers
        }
      });
    }
    Rides.update(this._id, {$set:options}, {}, function(error){
      if (!error) {
        jQueryUtils.flash(e.currentTarget.parentNode, '#aaddff');
      }
    });
  }
});

Template.rideItem.helpers({
  isDriverUI: function(){
    return window.location.pathname.match('/drivers/.*$');
  },
  editingClass: function(){
    return this.editing && 'editing';
  },
  selectedClass: function(){
    return this.selected && 'selected';
  },
  statusClass: function(){
    return this.status === Rides.states.FOUND && 'status-found' ||
      this.status === Rides.states.NOT_FOUND && 'status-not-found';
  },
  formattedTime: function(){
    var today = new Date().toDateString();
    var rideDate = new Date(this.time).toDateString();
    var rideHourMin = this.time.split('T')[1];
    var rideHour = parseInt(rideHourMin.split(':')[0]);
    var rideMin = rideHourMin.split(':')[1];
    if (rideHour === 0) {
      rideHour = 12;
      period = 'AM';
    } else if (rideHour > 0 && rideHour < 12) {
      period = 'AM';
    } else if (rideHour == 12) {
      period = 'PM';
    } else if (rideHour > 12 && rideHour < 24) {
      rideHour -= 12;
      period = 'PM';
    }
    rideHourMin = '' + rideHour + ':' + rideMin + ' ' + period;
    var dateString = rideDate.split(' ').splice(1, 2).join(' ').replace(/^0/, '');

    return (rideDate == today) ? rideHourMin : dateString + ', ' + rideHourMin;
  }
});

