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
    Cars.update(this._id, {$set: carDetails}, function(error){
      if(!error){
        jQueryUtils.flash(e.currentTarget.parentNode, '#aaddff');
      }
    });
  }
});

Template.carItem.helpers({
  isEditing: function(){
    return this.editing ? 'editing' : '';
  }
});
