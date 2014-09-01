/**
* Class for generic form methods that are applicable throughout different applications.
*
* Any functions here should only perform manipulations on the form or related UI elements
* and nothing else.
*
* Assumptions:
* - each form field input elt is marked with [data-input=true]
* - each form field input elt has a name attribute, which is the field name
**/

formUtils = function(){

  // Converts a standard form into a json file.
  function formToJson(form){
    var json = {};
    $(form).find('[data-input=true]').each(function(){
      var fieldName = $(this).attr('name');
      var val = ($(this).val() || $(this).text()).trim();
      json[fieldName] = (isNaN(val) || val === "") ? val : parseInt(val);
    });
    return json;
  }

  function resetForm(form){
    $(form).find('[name="name"]').focus();
    $(form).find('input[name=time]').data('default', utils.getCurrentTime());
    $(form).find('[data-input=true]').each(function(){
      $(this).val($(this).data('default') || '');
      $(this).css('background-color', '#fff');
    });
    $(form).find('.label.clickable').removeClass('label-danger');
  }

	/**
	* Form tasks upon receiving a response from server on whether the form values satisfy
	* the constraints of the model.
	*
	* @param response: form of {isInputValid:boolean, invalid:array}
	**/

	function onResponse(response, form){
		if(response.isInputValid === true){
			this.resetForm(form);
		}
		else{
			$(form).find('[data-input=true]').css('background-color', '#fff');
      response.invalid.forEach(function(fieldName){
        $(form).find('[name=' + fieldName + ']').first().css('background-color', '#ffdddd');
      });
		}
	}

	return {
    formToJson: formToJson,
	onResponse: onResponse,
	resetForm: resetForm
  };
}();
