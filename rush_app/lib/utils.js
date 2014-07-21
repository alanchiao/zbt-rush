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
  
  that.formToJson = function(form){
    var json = {};
    $(form).find('[data-input=true]').each(function(){
      var fieldName = $(this).attr('name');
      var val = $(this).val() ? $(this).val() : $(this).text();
      json[fieldName] = (isNaN(val) || val === "") ? val : parseInt(val);
      $(this).css('background-color', '#ffffff');
    });
    var invalid = that.validateJson(json);
    if (invalid.length > 0) {
      invalid.forEach(function(fieldName){
        $(form).find('[name=' + fieldName + ']').first().css('background-color', '#ffdddd');
      });
      return false;
    } else {
      that.clearForm(form);
      return json;
    }
  },

  that.clearForm = function(form){
    $(form).find('[data-input=true]').each(function(){
      $(this).val('');
    });
  },

  that.validateJson = function(json){
    var invalid = [];
    if (json.name === "") {
      invalid.push('name');
    }
    if (json.phone === "") {
      invalid.push('phone');
    }
    // if passengers is not undefined, it should be a number
    if (json.passengers != undefined && (json.passengers === "" || typeof json.passengers != 'number')) {
      invalid.push('passengers');
    }
    // if capacity is not undefined, it should be a number
    if (json.capacity != undefined && (json.capacity === "" || typeof json.capacity != 'number')) {
      invalid.push('capacity');
    }
    if (json.pickup === "") {
      invalid.push('pickup');
    }
    return invalid;
  }

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
