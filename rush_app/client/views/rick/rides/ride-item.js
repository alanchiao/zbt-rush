Template.rideItem.events({
  'click [data-js=ride]': function(e){
    if(this.editing === false){
        Rides.update(this._id, {$set:{selected: !this.selected}});
    }
  },
  'click [data-js=delete]': function(e){
    Rides.remove(this._id);
  },
  'click [data-js="edit"]': function(e){
    e.stopPropagation();
    console.log(this.editing);
    Rides.update(this._id, {$set:{editing: !this.editing}});
  },
  'submit form': function(e){
    e.preventDefault();
    var options = utils.formToJson(e.target);
    Rides.update(this._id, {$set:options});
  }
});

Template.rideItem.helpers({
    editClass: function(){
        if(this.editing === true){
            return 'editing'
        } else {
            return '';
        }
    },
    selectedClass: function(){
        if(this.selected === true){
            return 'selected'
        } else {
            return '';
        }
    }
});

