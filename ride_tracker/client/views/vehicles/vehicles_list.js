// mock data for vehicles
var marioRide = [
	{
		time: '4:00 AM', // change to dateTime obj
		name: 'Mario',
		passengers: 1,
		phone: '123-456-7890',
		status: 'carrying', // enum?
		pickup: 'ZBT',
		dropoff: 'Logan Airport',
		comments: 'penis'
	}
];

var vehiclesData = [
	{
		name: 'Charles Liu',
		passengers: 1, // sum of rides's passengers
		capacity: 5,
		phone: '510-444-4444',
		location: 'ZBT',
		rides: marioRide
	}
]

Template.vehiclesList.helpers({
	vehicles: vehiclesData
});