var userId = null;
var user = Meteor.users.findOne({username: 'rick'});

if(!user){
  var rickId = 
  Meteor.users.insert({
    'username' : 'rick'
  });

  Accounts.setPassword(rickId, 'password');
}


