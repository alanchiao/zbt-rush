//Class for generic utility functions, applicable anywhere.
utils = function(){

  //I understand its usage, but needs clearer function name.	
	//like toggleItem?. Move to formUtils after if location is
	//more appropriate than jQueryUtils.
  function resetItem(form, options){
    $(form).find('[data-input=true]').each(function(){
      if (options && options.default) {
        $(this).html($(this).html().replace("<br>", "").trim() || $(this).data('default') || '');
      } else {
        $(this).html(($(this).html() == '_') ? '' : $(this).html());
      }
    });
  }

	function parsePhoneNumber(phoneNumber){
		var reg = new RegExp("[+\\-() ]", "g");
		phoneNumber = phoneNumber.toString();
		var emptied = phoneNumber.replace(reg, "");
		if(emptied.length === 10)
			emptied = "1" + emptied;
	  emptied = "+" + emptied;
		return emptied;
	}

	function getCurrentTime(){
    var d = new Date();
    d.setHours(d.getHours() - d.getTimezoneOffset()/60);
    return d.toISOString().split(':').splice(0,2).join(':');
	}

  return {
    resetItem: resetItem,
    parsePhoneNumber: parsePhoneNumber,
    getCurrentTime: getCurrentTime
  };
}();
