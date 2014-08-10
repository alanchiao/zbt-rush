var USABLE_NUMBERS = [
	'+19786219636', '+14354143012', '+17865661641',
	'+17147026149', '+12819950162', '+19135498027',
	'+15103783381', '+15156643991', '+18587051195'];
	 
var SAMPLE_RIDES = [{
    name:'Kevin Tian',
    time: '2014-09-01T15:00',
    passengers: 4,
    phone: '(510)-378-2423',
    pickup: 'Next',
    dropoff: 'ZBT',
    comments: 'Mr. Fantastic'
}, {
    name: 'Alex Jaffe',
    time: '2014-09-01T16:00',
    passengers: 3,
    phone: '(535)-343-2312',
    pickup: 'Maseeh',
    dropoff: 'ZBT',
    comments: 'J-j-j-jaffe'
}, {
    name: 'Alan Chiao',
    time: '2014-09-01T18:30',
    passengers: 1,
    phone: '(617)-332-4345',
    pickup: 'Baker',
    dropoff: 'ZBT',
    comments: 'Skippah'
}];

var SAMPLE_DRIVERS = [{
    name: 'Charles',
    phone: '(617)-393-4234',
    capacity: 5,
    comments: 'ZBestpresidenT'
}, {
    name: 'Kyle',
    phone: '(234)-567-7890',
    capacity: 4,
    comments: 'Pretty cool guy'
}];

libFixtures = function(){
	
	var that = {};
	 
  //for development purposes - equivalent to cmd: meteor reset.
  that.reset = function(){
    Rides.find().fetch().forEach(function(ride){
        Rides.remove(ride._id);
    });
    Drivers.find().fetch().forEach(function(driver){
        Drivers.remove(driver._id);
    });
    SAMPLE_RIDES.forEach(function(ride){
        Meteor.call('ride', ride, function(error,id){
            if(error){
                return alert(error.reason);
            }
        });
    });
    SAMPLE_DRIVERS.forEach(function(driver){
        Meteor.call('driver', driver, function(error,id){
            if(error){
                return alert(error.reason);
            }
        });
    });
  }

  that.sampleRides = SAMPLE_RIDES;
  that.sampleDrivers = SAMPLE_DRIVERS;
	that.usableNumbers = USABLE_NUMBERS;  

	return that;
}();
