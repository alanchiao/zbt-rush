
Template.driverItem.helpers({
    phoneNumber: function(){
        var phoneId = this.phone;
        var phone = Phones.findOne(phoneId);
        return phone['phone'];
    }
});

Template.driverItem.events({
    'click [data-js=delete]': function(e){
    	CollectionHandler.deleteItem('Drivers', this._id)(e);
    	return false;
    },
    'click [data-js="edit"]': function(e){
	    var driver = $('[data-id=' + $(e.currentTarget).attr('data-target-id') + ']')[0];
    	if($(driver).data('editing')){
    		$(e.currentTarget).removeClass('glyphicon-check');
    		$(e.currentTarget).addClass('glyphicon-edit');
    		$(driver).removeClass('editing');
	    	CollectionHandler.editItem('Drivers', this._id)(e);

	    	$(driver).data('editing', false);
	    	$(driver).find('[data-js="editable"]').toArray().forEach(function(field, index){
	    		field.dataset.input = false;
	    		field.contentEditable = false;
	    	});
    	} else {
    		$(e.currentTarget).removeClass('glyphicon-edit');
    		$(e.currentTarget).addClass('glyphicon-check');
    		$(driver).addClass('editing');
	    	$(driver).data('editing', true);
	    	$(driver).find('[data-js="editable"]').toArray().forEach(function(field, index){
	    		field.dataset.input = true;
	    		field.contentEditable = true;
	    	});
    	}
    	return false;
    }
});
