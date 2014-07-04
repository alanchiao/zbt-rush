Template.rideForm.events({
    'submit form': function(e){
        e.preventDefault();
        var ride = utils.formToJson(e.target);
        console.log(ride);

        Meteor.call('ride', ride, function(error,id){
            if(error){
                return alert(error.reason);
            }
        });
    }
});

