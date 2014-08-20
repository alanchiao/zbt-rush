jQueryUtils = function(){

  /**
  * UI drawer expansion/hiding (arrow thing to click for displaying more or less data)
  * Requires: handle for expanding the drawer has a data-target that tells the drawer
  * what element contains the additional information to display or hide. That target
  * element has [data-js={identifier}].
  **/
  function toggleDrawer(handle, drawer){
    if(drawer.is(':hidden')){
        drawer.slideDown('fast');
        handle.removeClass('glyphicon-chevron-down');
        handle.addClass('glyphicon-chevron-up');
    } else {
        drawer.slideUp('fast');
        handle.removeClass('glyphicon-chevron-up');
        handle.addClass('glyphicon-chevron-down');
    }
  }

  function flash(target, color){
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

  return {
    toggleDrawer: toggleDrawer,
    flash: flash
  }
}();

