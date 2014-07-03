Template.driversList.helpers({
    drivers: function(){
        return Drivers.find();
    }
});


Template.driversList.events({
    'click #add-driver': function(e){
        e.preventDefault();
        $('#driver-form').css('display', 'block');
    }
});
