//Connects rides and drivers portion of the rick app
// TODO: change name -> data-id or something similar
Template.rick.events({
  'click [data-js=reset]': function(e){
    utils.reset();
  },
});
