
Template.driverItem.helpers({
    phoneNumber: function(){
        console.log(this.phone);
        var phoneId = this.phone;
        var phone = Phones.findOne(phoneId);
        return phone['phone'];
    }
});

Template.driverItem.events({
    'click [data-js=delete]':CollectionHandler.deleteItem('Drivers'),
    'click [data-js=edit]': CollectionHandler.editItem('Drivers')
});
