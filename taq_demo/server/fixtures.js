if (Listings.find().count() === 0){
  Listings.insert({
    name: 'Alan Chiao',
    reason: 'none',
    location: 'A12',
    status: 'unclaimed'
  });

  Listings.insert({
    name: 'Johnny D',
    reason: 'none',
    location: 'A11',
    status: 'unclaimed'
  });

  Listings.insert({
    name: 'JRSun',
    reason: 'none',
    location: 'A12',
    status: 'unclaimed'
  });
}
  
