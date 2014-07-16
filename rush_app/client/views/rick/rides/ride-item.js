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
    'click [data-js=delete]':CollectionHandler.deleteItem('Rides'),
    'click [data-js=edit]':CollectionHandler.editItem('Rides')
});
