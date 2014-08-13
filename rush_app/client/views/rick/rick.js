//Connects rides and drivers portion of the rick app
Template.rick.events({
  'click [data-js=reset]': function(e){
    libFixtures.reset();
  },
});
