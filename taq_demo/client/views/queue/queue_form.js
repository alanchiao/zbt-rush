Template.queueForm.events({
  'submit form': function(e){
    e.preventDefault();
    
    nameElt = $(e.target).find('[name=name]');
    reasonElt = $(e.target).find('[name=reason]');
    locationElt = $(e.target).find('[name=location]');

    var listing ={
      name: nameElt.val(), 
      reason: reasonElt.val(),
      location: locationElt.val() 
    };
    
    nameElt.val('');
    reasonElt.val('');
    locationElt.val('');

    Meteor.call('listing', listing, function(error, id){
      if (error)
        return alert(error.reason);
    }); 
  }
});
      
