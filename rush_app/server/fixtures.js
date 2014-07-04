if (Rides.find().count() === 0){
    Rides.insert({
        name:'Kevin Tian',
        time: '3:00 PM',
        passengers: '4',
        phone: '(510)-378-2423',
        pickup: 'Next House',
        dropoff: 'ZBT',
        status: 'unassigned',
        comments: 'Mr. Fantastic'
    });

    
    Rides.insert({
        name: 'Alan Chiao',
        time: '3:45 PM',
        passengers: '1',
        phone: '(617)-332-4345',
        pickup: 'Baker',
        dropoff: 'ZBT',
        status: 'unassigned',
        comments: 'Silver Surfer'
    });


    Rides.insert({
        name: 'Alex Jaffe',
        passengers: '3',
        phone: '(535)-343-2312',
        pickup: 'Maseeh',
        dropoff: 'ZBT',
        status: 'unassigned',
        comments: 'J-j-j-jaffe'
    });
};


if (Drivers.find().count() == 0){
    Drivers.insert({
        name: 'Charles',
        passengers: '0',
        phone: '(617)-393-4234',
        capacity: '5',
        comments: 'ZBestpresidenT',
        rides: []
    });
}
    
