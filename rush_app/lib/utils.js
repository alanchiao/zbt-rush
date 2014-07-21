var SAMPLE_RIDES = [{
    name:'Kevin Tian',
    time: '3:00 PM',
    passengers: 4,
    phone: '(510)-378-2423',
    pickup: 'Next House',
    dropoff: 'ZBT',
    comments: 'Mr. Fantastic'
}, {
    name: 'Alex Jaffe',
    time: '4:45 PM',
    passengers: 3,
    phone: '(535)-343-2312',
    pickup: 'Maseeh',
    dropoff: 'ZBT',
    comments: 'J-j-j-jaffe'
}, {
    name: 'Alan Chiao',
    time: '3:45 PM',
    passengers: 1,
    phone: '(617)-332-4345',
    pickup: 'Baker',
    dropoff: 'ZBT',
    comments: 'Skippah'
}];

var SAMPLE_DRIVERS = [{
    name: 'Charles',
    phone: '(617)-393-4234',
    capacity: 5,
    comments: 'ZBestpresidenT'
}, {
    name: 'Kyle',
    phone: '(234)-567-7890',
    capacity: 4,
    comments: 'Pretty cool guy'
}];

//Class for random user interface related utility functions
utils = function(){
  var that = {};
  
  /**
  * Converts a standard form into a json file.
  * Requires: input field elements must be tagged with [data-input=true] and their 'name' must be
  * the field name.
  **/
  that.formToJson = function(form){
     var json = {};
     $(form).find('[data-input=true]').each(function(){
         var fieldName = $(this).attr('name');
         var val = $(this).val() ? $(this).val() : $(this).text();
         json[fieldName] = isNaN(val) ? val : parseInt(val);
         $(this).val('');
     });
     return json;
  }

  /**
  * UI drawer expansion/hiding (arrow thing to click for displaying more or less data)
  * Requires: handle for expanding the drawer has a data-target that tells the drawer
  * what element contains the additional information to display or hide. That target
  * element has [data-js={identifier}].
  **/
  that.toggleDrawer = function(handle){
    var $target = $(document).find('[data-js=' + $(handle).attr('data-target') + ']');
    var $handle = $(handle);
    if($target.is(':hidden')){
        $target.slideDown('fast');
        $handle.removeClass('glyphicon-chevron-down');
        $handle.addClass('glyphicon-chevron-up');
    } else {
        $target.slideUp('fast');
        $handle.removeClass('glyphicon-chevron-up');
        $handle.addClass('glyphicon-chevron-down');
    }
  }

  //for development purposes - equivalent to cmd: meteor reset.
  that.reset = function(){
    Rides.find().fetch().forEach(function(ride){
        Rides.remove(ride._id);
    });
    Drivers.find().fetch().forEach(function(driver){
        Drivers.remove(driver._id);
    });
    SAMPLE_RIDES.forEach(function(ride){
        Meteor.call('ride', ride, function(error,id){
            if(error){
                return alert(error.reason);
            }
        });
    });
    SAMPLE_DRIVERS.forEach(function(driver){
        Meteor.call('driver', driver, function(error,id){
            if(error){
                return alert(error.reason);
            }
        });
    });
  }

  that.sampleRides = SAMPLE_RIDES;
  that.sampleDrivers = SAMPLE_DRIVERS;
  
  //prevent modification of object slots
  Object.freeze(that);
  return that;
}();
