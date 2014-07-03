Template.rick.events({
    'click .ride': function(e){
        console.log(e.currentTarget);
        currentRideId = $(e.currentTarget).find('[name=rideId]')[0].innerText;
     },

     'click .driver': function(e){
        console.log(e.currentTarget);
         var selectedDriverId = $(e.currentTarget).find('[name=driverId]')[0].innerText;
         if (currentRideId != null){

            var driver = Drivers.find(selectedDriverId).fetch()[0];
            console.log(driver);
            Meteor.call('assignRide', currentRideId, selectedDriverId, function(error, id){
                if (error){
                    return alert(error.reason);
                }
            });
            currentRideId = null;
         }
     }
});

var currentRideId;
