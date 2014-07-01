(function(){// mock data for rides
var ridesData = [
	{
		time: '3:00 PM', // change to dateTime obj
		name: 'Kevin Li',
		passengers: 4,
		phone: '123-456-7890',
		status: 'scheduled', // enum?
		pickup: 'Next House',
		dropoff: 'ZBT',
		comments: 'This guy is chill'
	}
];
Template.ridesList.helpers({
	rides: ridesData
});

})();
