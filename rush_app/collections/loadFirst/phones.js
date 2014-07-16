Phones = new Meteor.Collection("phones");
CollectionHandler.addCollection("phones", Phones);

Meteor.methods({
    phone: function(attributes){
        var phone = _.extend(attributes,{});

        var phoneId = Phones.insert(phone);

        return phoneId;
   }
});
            
            


