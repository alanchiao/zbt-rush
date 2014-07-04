Template.driverForm.events({
    'click .driver-drawer-handle': function(e){
        var target = $('.driver-drawer-target');
        if(target.is(':hidden')){
            target.slideDown();
            $('.driver-drawer-handle').removeClass('glyphicon-chevron-down');
            $('.driver-drawer-handle').addClass('glyphicon-chevron-up');
        } else {
            target.slideUp();
            $('.driver-drawer-handle').removeClass('glyphicon-chevron-up');
            $('.driver-drawer-handle').addClass('glyphicon-chevron-down');
        }
    },
    'submit form': function(e){
        e.preventDefault();
        var driver = utils.formToJson(e.target);

        Meteor.call('driver', driver, function(error, id){
            if (error){
                return alert(error.reason);
            }
        });
            
    }
});
