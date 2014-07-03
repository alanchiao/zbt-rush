Rides = new Meteor.Collection("rides");

Rides.allow({
    update: function(){
        return true;
    }
});

Meteor.methods({
    ride: function(attributes){
        var ride = _.extend(_.pick(attributes, 'rushee', 'location', 'phoneNumber',
        'numPeople'),{
            status: 'unassigned'
        });

        var rideId = Rides.insert(ride);

        return rideId;
    }
});

