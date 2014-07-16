Template.rideItem.helpers({
	iconify: function(){
		var f = function(status){
		}

		//TODO
		return f;
	},

    phoneNumber: function(){
        var phoneId = this.phone;
        var phone = Phones.findOne(phoneId);
        return phone['phone'];
    }
});

Template.rideItem.events({
    'click [data-js=delete]': function(e){
    	CollectionHandler.deleteItem('Rides', this._id)(e);
    	return false;
    },
    'click [data-js="edit"]': function(e){
	    var ride = $('[data-id=' + $(e.currentTarget).attr('data-target-id') + ']')[0];
    	if($(ride).data('editing')){
    		$(e.currentTarget).removeClass('glyphicon-check');
    		$(e.currentTarget).addClass('glyphicon-edit');
    		$(ride).removeClass('editing');
            console.log(e);
	    	CollectionHandler.editItem('Rides', this._id)(e);

	    	$(ride).data('editing', false);
	    	$(ride).find('.info-field').toArray().forEach(function(field, index){
	    		field.dataset.input = false;
	    		field.contentEditable = false;
	    	});
    	} else {
    		$(e.currentTarget).removeClass('glyphicon-edit');
    		$(e.currentTarget).addClass('glyphicon-check');
    		$(ride).addClass('editing');
	    	$(ride).data('editing', true);
	    	$(ride).find('.info-field').toArray().forEach(function(field, index){
	    		field.dataset.input = true;
	    		field.contentEditable = true;
	    	});
    	}
    	return false;
    }
});
