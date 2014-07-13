// these events apply to the ride form only. duplicate code exists in driver-form.js

Template.rideForm.events({
    'click [data-js=handle]': function(e){
        utils.toggleDrawer(e.target);
    },
    'submit form': function(e){
        e.preventDefault();
        var ride = utils.formToJson(e.target);

        Meteor.call('ride', ride, function(error,id){
            if(error){
                return alert(error.reason);
            }
        });
    }
});

