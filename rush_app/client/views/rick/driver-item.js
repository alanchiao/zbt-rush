Handlebars.registerHelper('calcSpace', function(capacity, occupiedSeats){
    return capacity - occupiedSeats;
});
