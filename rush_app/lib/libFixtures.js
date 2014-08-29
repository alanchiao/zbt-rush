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

var SAMPLE_CARS = [{
    name: 'Jackies Car',
    description: 'gray car',
    capacity: 5
}];

libFixtures = function(){
	
    var that = {};
	 
  //for development purposes - equivalent to cmd: meteor reset.
  that.reset = function(){
		ActiveDrivers.find().forEach(function(activeDriver){
			ActiveDrivers.remove(activeDriver._id);
		});
    Cars.find().forEach(function(car){
        Cars.remove(car._id);
    });
		Drivers.find().forEach(function(driver){
        Drivers.remove(driver._id);
    });
		Rides.find().forEach(function(ride){
        Rides.remove(ride._id);
    });
		/**
    SAMPLE_RIDES.forEach(function(ride){
        Meteor.call('ride', ride, function(error,id){
            if(error){
                return alert(error.reason);
            }
        });
    });
    SAMPLE_CARS.forEach(function(car){
        Meteor.call('car', car, function(error,id){
            if(error){
                return alert(error.reason);
            }
        });
    });
		**/
  }

  that.sampleRides = SAMPLE_RIDES;
	that.usableNumbers = USABLE_NUMBERS;  

	return that;
}();
