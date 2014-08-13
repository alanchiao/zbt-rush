jQueryUtils = function(){
	var that = {};

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
	
	Object.freeze(that);
	return that;
}();

