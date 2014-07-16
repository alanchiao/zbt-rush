/** Necessary for data related stuff**/
Meteor.publish('drivers', function(){
    return Drivers.find();
});
