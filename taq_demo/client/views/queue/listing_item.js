Template.listingItem.helpers({
  name: function(){
    return this.name;
  },

  location: function(){
    return this.location;
  },

  reason: function(){
    return this.reason;
  },

  isAdmin: function(){
    if(Accounts.loginServicesConfigured()){
      var adminId = Meteor.users.findOne({username: 'rick'})._id;
      return adminId == Meteor.userId();
    }
  },

  notClaimed: function(){
    return this.status === 'unclaimed';
  }
});

Template.listingItem.events({
  'click #claim-button': function(e){
    e.preventDefault();
    Listings.update(this._id, {$set: {status: 'claimed'}});
   },

   'click #resolved-button': function(e){
     Listings.remove(this._id);
   }
});
