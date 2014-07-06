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
  };
  
  //prevent modification of object slots
  Object.freeze(that);
  return that;
}();
