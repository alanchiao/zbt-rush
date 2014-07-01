Template.driversList.helpers({
    drivers: function(){
        return Drivers.find();
    }
});


Template.driversList.events({
    'click #add-driver': function(){
        e.preventDefault();

    }
});
