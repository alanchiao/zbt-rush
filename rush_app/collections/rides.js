Rides = new Meteor.Collection("rides");
CollectionHandler.addCollection('Rides', Rides, {'phone': Phones});

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
            'status': 'unassigned',
            'phone':Phones.insert({'phone':attributes.phone})
        });
        var rideId = Rides.insert(ride);

        return rideId;
    }
});

