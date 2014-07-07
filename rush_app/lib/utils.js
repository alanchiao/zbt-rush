//Class for random user interface related utility functions
utils = function(){
  var that = {};

  /* Upon click of a, swap b and c */
  that.onSwap = function(a, b, c){
      $(a).click(function(){
          
      });
  }

  /* Set up listener to depress single element in
  list upon click. Undepress previously depressed
  element */
  that.selectInList = function(listSelector){

  }
  
  that.formToJson = function(form){
     var json = {};
     $(form).find('.input-field').each(function(){
         var fieldName = $(this).attr('name');
         json[fieldName] = $(this).val();
         $(this).val('');
     });
     return json;
  }

  that.toggleDrawer = function(handle){
    var $target = $(document).find('[data-js=' + $(handle).attr('data-target') + ']');
    t = $target;
    var $handle = $(handle);
    h = $handle;
    if($target.is(':hidden')){
        $target.slideDown();
        $handle.removeClass('glyphicon-chevron-down');
        $handle.addClass('glyphicon-chevron-up');
    } else {
        $target.slideUp();
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
        Rides.insert(ride);
    });
    SAMPLE_DRIVERS.forEach(function(driver){
        Drivers.insert(driver);
    });
  }

  that.sampleRides = SAMPLE_RIDES;
  that.sampleDrivers = SAMPLE_DRIVERS;
  
  //prevent modification of object slots
  Object.freeze(that);
  return that;
}();

var SAMPLE_RIDES = [{
    name:'Kevin Tian',
    time: '3:00 PM',
    passengers: '4',
    phone: '(510)-378-2423',
    pickup: 'Next House',
    dropoff: 'ZBT',
    status: 'unassigned',
    comments: 'Mr. Fantastic'
}, {
    name: 'Alex Jaffe',
    time: '4:45 PM',
    passengers: '3',
    phone: '(535)-343-2312',
    pickup: 'Maseeh',
    dropoff: 'ZBT',
    status: 'unassigned',
    comments: 'J-j-j-jaffe'
}, {
    name: 'Alan Chiao',
    time: '3:45 PM',
    passengers: '1',
    phone: '(617)-332-4345',
    pickup: 'Baker',
    dropoff: 'ZBT',
    status: 'unassigned',
    comments: 'Skippah'
}];

var SAMPLE_DRIVERS = [{
    name: 'Charles',
    passengers: '0',
    phone: '(617)-393-4234',
    capacity: '5',
    comments: 'ZBestpresidenT',
    rides: []
}, {
    name: 'Kyle',
    passengers: '0',
    phone: '(234)-567-7890',
    capacity: '4',
    comments: 'Pretty cool guy',
    rides: []
}];