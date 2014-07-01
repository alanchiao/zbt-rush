Template.driverForm.events({
    'submit form': function(e){
        e.preventDefault();

        var driverProperties = {
            name: $(e.target).find('[name=name]').val(),
            capacity: $(e.target).find('[name=capacity]').val()
        }

        Meteor.call('driver', driverProperties, function(error, id){
            if (error){
                return alert(error.reason);
            }
            else{
                //Make form disappear
            }
        });
            
    }
});
