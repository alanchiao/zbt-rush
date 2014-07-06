Rides = new Meteor.Collection("rides");

Rides.allow({
    insert: function(){
        return true;
    },
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    }
});

Meteor.methods({
    ride: function(attributes){
        var ride = _.extend(attributes,{
            status: 'unassigned'
        });

        var rideId = Rides.insert(ride);

        return rideId;
    }
});

