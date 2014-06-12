Template.queueList.helpers({
  listings: function(){
    var listings =  Listings.find().fetch();
    for (var i = 0; i < listings.length; i++){
      listings[i].index = i+1;
    }
    return listings;
  }
});

