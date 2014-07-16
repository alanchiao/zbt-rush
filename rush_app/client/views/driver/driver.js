Template.driver.helpers({
    assignedRides: function(){
        var rideList = this.rides;
        return Rides.find({_id: {$in: rideList}}).fetch();
    },
    currDriverId: function(){
        return Driver.findOne().fetch()[0]._id;
    }
});

Template.driver.events({
    'click #complete-trip':function(e){
        var isRideComplete = true;
        var assigned = Rides.find({status: {$in: ["assigned", "pickedUp", "unfound"]}}).fetch();
        assigned.forEach(function(entry){
            if(entry.status !== 'pickedUp' &&  entry.status !== 'unfound'){
               isRideComplete = false;
            }
        }); 
       
        if(isRideComplete){
            assigned.forEach(function(entry){
                Rides.update(entry._id, {$set: {status:'complete'}});
            });
        }
        else {
            alert("Ride is actually not compelete");
        }
    }
});
