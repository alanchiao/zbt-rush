//Twilio Library! twilio-meteor package with dependency on moment package.
//Use of this library must be done on the server side.
//Currently using Alan Chiao's Twilio trial account.A

var accountSID = 'AC6334f8b0d116050fa3d9adde8b24b182';
var authToken = '40dd0dffd467036e0e053d1e1d2cb324';
twilio = Twilio(accountSID, authToken);

Meteor.methods({
  sendText: function(body, number){
    console.log("--------TWILIO--------");
    twilio.sendSms({
      to: number,
      from:'+15082831128',
      body: body
    }, function(err, responseData){
      if(!err){}
    });
  }
});
