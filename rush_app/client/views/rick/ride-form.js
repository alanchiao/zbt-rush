Template.rideForm.events({
    'submit form': function(e){
        e.preventDefault();

        var rideProperties ={
            'rushee':$(e.target).find('[name=name]').val(),
            'phoneNumber': $(e.target).find('[name=phone-number]').val(),
            'location': $(e.target).find('[name=location]').val(),
            'numPeople': $(e.target).find('[name=occupancy]').val()
        }

        Meteor.call('ride', rideProperties, function(error,id){
            if(error){
                return alert(error.reason);
            }
        });
    }
});
