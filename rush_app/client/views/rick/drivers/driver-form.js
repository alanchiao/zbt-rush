Template.driverForm.events({
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
