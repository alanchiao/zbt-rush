var USABLE_NUMBERS = [
	'+19786219636', '+14354143012', '+17865661641',
	'+17147026149', '+12819950162', '+19135498027',
	'+15103783381', '+15156643991', '+18587051195'];
	 
var SAMPLE_RIDES = [{
    name:'Kevin Tian',
    time: '2014-09-01T15:00',
    passengers: 4,
    phone: '(510)-378-2423',
    pickup: 'Next',
    dropoff: 'ZBT',
    comments: 'Mr. Fantastic'
}, {
    name: 'Alex Jaffe',
    time: '2014-09-01T16:00',
    passengers: 3,
    phone: '(535)-343-2312',
    pickup: 'Maseeh',
    dropoff: 'ZBT',
    comments: 'J-j-j-jaffe'
}, {
    name: 'Alan Chiao',
    time: '2014-09-01T18:30',
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
      return json;
    }
  },

  that.resetForm = function(form){
    $(form).find('[name="name"]').focus();
    $(form).find('[data-input=true]').each(function(){
      $(this).val($(this).data('default') || '');
    });
  },

  that.resetItem = function(form, options){
    $(form).find('[data-input=true]').each(function(){
      if (options && options.default) {
        $(this).html($(this).html() || $(this).data('default') || '');
      } else {
        $(this).html(($(this).html() == '_') ? '' : $(this).html());
      }
    });
  },

  that.validateJson = function(json){
    var invalid = [];
    if (json.name === "") {
      invalid.push('name');
    }
    if (json.time === "" || (json.time != undefined && !json.time.match(/^2014-0[89]-[0-9]{2}T[0-9]{2}:[0-9]{2}/))) {
      invalid.push('time');
    }
    if (json.phone === "") {
      invalid.push('phone');
    }
    // if passengers is not undefined, it should be a number
    if (json.passengers != undefined && (json.passengers === "" || typeof json.passengers != 'number' || json.passengers <= 0)) {
      invalid.push('passengers');
    }
    // if capacity is not undefined, it should be a number
    if (json.capacity != undefined && (json.capacity === "" || typeof json.capacity != 'number' || json.capacity <= 0)) {
      invalid.push('capacity');
    }
    if (json.pickup === "") {
      invalid.push('pickup');
    }
    return invalid;
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

  that.flash = function(target, color){
    $(target).animate({
      backgroundColor: color
    }, 1, function(){
      $(this).animate({
        backgroundColor: 'white'
      }, 500, function(){
        $(this).css('background-color', '');
      });
    });
  }

	that.parseNumber = function(phoneNumber){
		var reg = new RegExp("[+\\-() ]", "g");
		phoneNumber = phoneNumber.toString();
		var emptied = phoneNumber.replace(reg, "");
		if(emptied.length === 10)
			emptied = "1" + emptied;
	  emptied = "+" + emptied;
		return emptied;
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
	that.usableNumbers = USABLE_NUMBERS;  
  //prevent modification of object slots
  Object.freeze(that);
  return that;
}();
