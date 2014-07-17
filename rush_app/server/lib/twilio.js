var accountSID = 'AC6334f8b0d116050fa3d9adde8b24b182';
var authToken = '40dd0dffd467036e0e053d1e1d2cb324';
twilio = Twilio(accountSID, authToken);

Meteor.methods({
    //hard coded. feel free to change to your number
    textSomeone: function(driverId){
        console.log("----------TWILIO--------");
        twilio.sendSms({
            to:'+19786219636',
            from:'+15082831128',
            body: 'https://rush-app.meteor.com/driver/' + driverId
        }, function(err, responseData){
            if(!err){
                //HURRAH
            }
       });
    }
});
