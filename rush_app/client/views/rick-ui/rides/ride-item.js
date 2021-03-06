/**
* Meteor Blaze bug with respect to contenteditable.
* Refer to : https://github.com/meteor/meteor/issues/1964
* Fix is below with .rendered
**/

Template.rideItem.rendered = function(){
	var t = this;
	this.contentAutorun = Deps.autorun(function(){
		var ride = Rides.findOne(t.data._id);
		if(ride && ride.editing !== true){
			var replace = function(){
				t.findAll('[data-input=true]').forEach(function(field){
					field.innerHTML = ride[$(field).attr('name')];
				});
			}
			replace();
			setTimeout(replace, 8);
		}
	});
};

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
    var textButton = $(e.target).parents('[data-js="driver"]').find('[data-js="text"]');
    textButton.text('Text');
    textButton.show();

    Meteor.call("unAssignRide", this.driver._id, this._id, function(error){});
  },
  'click [data-js=delete]': function(e){
    e.stopPropagation();
    if (confirm("Delete " + this.name + "'s ride request?")) {
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
    var rideDetails  = formUtils.formToJson(e.target);
		console.log(rideDetails);
		Meteor.call('editRide', this._id, rideDetails, function(error, response){
			if(response.isInputValid === true){
        jQueryUtils.flash(e.currentTarget.parentNode, '#aaddff');
      } else {
				alert('invalid edit');
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

