Rides = new Meteor.Collection("rides");

Rides.allow({
    update: function(){
        return true;
    }
});

Meteor.methods({
    ride: function(attributes){
        //technically should pick out the particular attributes
        //to prevent hacking :P. Delete this comment when you
        //see it
        var ride = _.extend(attributes,{
            status: 'unassigned'
        });

        var rideId = Rides.insert(ride);

        return rideId;
    }
});

