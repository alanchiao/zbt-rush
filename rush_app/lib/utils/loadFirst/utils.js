//Class for generic utility functions, applicable anywhere.
utils = function(){
  var that = {};

  //I understand its usage, but needs clearer function name.	
	//like toggleItem?. Move to formUtils after if location is
	//more appropriate than jQueryUtils.
  that.resetItem = function(form, options){
    $(form).find('[data-input=true]').each(function(){
      if (options && options.default) {
        $(this).html($(this).html() || $(this).data('default') || '');
      } else {
        $(this).html(($(this).html() == '_') ? '' : $(this).html());
      }
    });
  }
	//Needs to be moved elsewhere. Not util since app-specific
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

	that.parsePhoneNumber = function(phoneNumber){
		var reg = new RegExp("[+\\-() ]", "g");
		phoneNumber = phoneNumber.toString();
		var emptied = phoneNumber.replace(reg, "");
		if(emptied.length === 10)
			emptied = "1" + emptied;
	  emptied = "+" + emptied;
		return emptied;
	}
  //prevent modification of object slots
  Object.freeze(that);
  return that;
}();
