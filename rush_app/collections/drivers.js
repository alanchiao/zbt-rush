Drivers = new Meteor.Collection('drivers');
CollectionHandler.addCollection('Drivers', Drivers, {'phone': Phones});


Drivers.allow({
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
    driver: function(attributes){
        var driver = _.extend(attributes, {
           'uid':1,
           'rides': [],
           'passengers': 0,
           'phone': Phones.insert({'phone':attributes.phone})
        });

        var driverId = Drivers.insert(driver);
        //TEST: Using only my phone for now. Feel
        //free to change to your own phone.
        if(attributes.phone === '(978)-621-9636'){
            twilio.sendSms({
                to:'+19786219636',
                from:'+15082831128',
                body: 'https://rush-app.meteor.com/driver/' + driverId
            }, function(err, responseData){
                if(!err){
                    //HURRAH
                }
             
           });
        }

        return driverId;
     },


     assignRide: function(rideId, driverId){
         var driver = Drivers.find(driverId).fetch()[0];
         var ride = Rides.find(rideId).fetch()[0];
         
         var rides = driver.rides;
         rides.push(rideId);

         var passengers = parseInt(driver.passengers) + parseInt(ride.passengers);

         Drivers.update(driverId, {$set:{'rides':rides, 'passengers':passengers}});
         Rides.update(rideId, {$set:{'status':'assigned'}});
     },
});
