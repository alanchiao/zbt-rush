Template.rideItem.helpers({
	iconify: function(){
		var f = function(status){
		}

		//TODO
		return f;
	}
});

Template.rideItem.events({
    'click [data-js=delete]':CollectionHandler.deleteItem('Rides'),
    'click [data-js=edit]':CollectionHandler.editItem('Rides')
});
