/** Class for generic form methods that are applicable throughout applications **/

formUtils = function(){
	/**
  * Converts a standard form into a json file.
  * Requires: input field elements must be tagged with [data-input=true] and their 'name' must be
  * the field name.
  **/
  function formToJson(form){
    var json = {};
    $(form).find('[data-input=true]').each(function(){
      var fieldName = $(this).attr('name');
      var val = $(this).val() || $(this).text();
      json[fieldName] = (isNaN(val) || val === "") ? val : parseInt(val);
      $(this).css('background-color', '#ffffff');
    });
		/**
    var invalid = utils.validateJson(json);
    if (invalid.length > 0) {
      invalid.forEach(function(fieldName){
        $(form).find('[name=' + fieldName + ']').first().css('background-color', '#ffdddd');
      });
      return false;
    } else {
		**/
      return json;
    //}
  }

  function resetForm(form){
    $(form).find('[name="name"]').focus();
    $(form).find('[data-input=true]').each(function(){
      $(this).val($(this).data('default') || '');
    });
  }

	function onResponse(response, form){
		if(response.isInputValid === true){
			resetForm(form);
		}
		else{
      response.invalid.forEach(function(fieldName){
        $(form).find('[name=' + fieldName + ']').first().css('background-color', '#ffdddd');
      });
		}
	}

	return {
    formToJson: formToJson,
    resetForm: resetForm,
		onResponse: onResponse
  };
}();

