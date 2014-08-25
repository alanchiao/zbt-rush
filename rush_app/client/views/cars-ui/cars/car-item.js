Template.carItem.events({
  'click [data-js=delete]':function(e){
    Cars.remove(this._id);
  },
  'click [data-js=edit]':function(e){
    Cars.update(this._id, {$set:{editing: !this.editing}});
  },
  'submit form': function(e){
    e.preventDefault();
    var carDetails = formUtils.formToJson(e.target);
    Meteor.call("editCar", this._id, carDetails, function(error, response){
			if(response.isInputValid === true){
        jQueryUtils.flash(e.currentTarget.parentNode, '#aaddff');
			} else {
				alert('invalid edit');
			}
		});
  }
});

Template.carItem.helpers({
  editingClass: function(){
    return this.editing && 'editing';
  }
});
