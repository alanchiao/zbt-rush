Template.rideForm.events({
    'click .ride-drawer-handle': function(e){
        var target = $('.ride-drawer-target');
        if(target.is(':hidden')){
            target.slideDown();
            $('.ride-drawer-handle').removeClass('glyphicon-chevron-down');
            $('.ride-drawer-handle').addClass('glyphicon-chevron-up');
        } else {
            target.slideUp();
            $('.ride-drawer-handle').removeClass('glyphicon-chevron-up');
            $('.ride-drawer-handle').addClass('glyphicon-chevron-down');
        }
    },
    'submit form': function(e){
        e.preventDefault();
        var ride = utils.formToJson(e.target);
        console.log(ride);

        Meteor.call('ride', ride, function(error,id){
            if(error){
                return alert(error.reason);
            }
        });
    }
});

