jQueryUtils = function(){

  /**
  * UI drawer expansion/hiding (arrow thing to click for displaying more or less data)
  * Requires: handle for expanding the drawer has a data-target that tells the drawer
  * what element contains the additional information to display or hide. That target
  * element has [data-js={identifier}].
  **/
  function toggleDrawer(handle, drawer, show){
    if(show !== undefined){
      if(show){
        this.showDrawer(handle, drawer);
      } else {
        this.hideDrawer(handle, drawer);
      }
    } else {
      if(drawer.is(':hidden')){
        this.showDrawer(handle, drawer);
      } else {
        this.hideDrawer(handle, drawer);
      }
    }
  }

  function showDrawer(handle, drawer){
    if(drawer.is(':hidden')){
      drawer.slideDown('fast');
      handle.removeClass('glyphicon-chevron-down');
      handle.addClass('glyphicon-chevron-up');
    }
  }

  function hideDrawer(handle, drawer){
    if(!drawer.is(':hidden')){
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
    showDrawer: showDrawer,
    hideDrawer: hideDrawer,
    flash: flash
  }
}();

