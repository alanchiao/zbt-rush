Listings = new Meteor.Collection("listings");

Meteor.methods({
  listing: function(listingAttributes){
    var listing = _.extend(_.pick(listingAttributes, 'name', 'reason', 'location'), {status: 'unclaimed'});
    var listingId = Listings.insert(listing);

    return listingId;
  }
});
