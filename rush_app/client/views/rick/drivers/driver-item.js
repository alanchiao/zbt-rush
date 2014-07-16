
Template.driverItem.helpers({
    phoneNumber: function(){
        var phoneId = this.phone;
        var phone = Phones.findOne(phoneId);
        return phone['phone'];
    }
});

Template.driverItem.events({
    'click [data-js=delete]':CollectionHandler.deleteItem('Drivers'),
    'click [data-js=edit]': CollectionHandler.editItem('Drivers')
});
