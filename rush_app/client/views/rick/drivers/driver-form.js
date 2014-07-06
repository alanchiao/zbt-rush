// these events apply to the driver form only. duplicate code exists in ride-form.js

Template.driverForm.events({
    'click [data-js=handle]': function(e){
        utils.toggleDrawer(e.target);
    },
    'submit form': function(e){
        e.preventDefault();
        var driver = utils.formToJson(e.target);

        Meteor.call('driver', driver, function(error, id){
            if (error){
                return alert(error.reason);
            }
        });
            
    }
});
