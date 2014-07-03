if (Rides.find().count() === 0){
    Rides.insert({
        'name':'clueless',
        'passengers':'3',
        'phone':'4',
        'status':'unassigned'
    });

    
    Rides.insert({
        'name':'clueless',
        'passengers':'3',
        'phone':'4',
        'status':'unassigned'
    });


    Rides.insert({
        'name':'clueless',
        'passengers':'3',
        'phone':'4',
        'status':'unassigned'
    });
};


if (Drivers.find().count() == 0){
    Drivers.insert({
        'name':'rick',
        'passengers':'0',
        'capacity':'25',
        'rides':[]
    });
}
    
