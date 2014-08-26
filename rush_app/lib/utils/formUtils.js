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
      var val = $(this).val() || $(this).text();
      json[fieldName] = (isNaN(val) || val === "") ? val : parseInt(val);
    });
    return json;
  }

  function resetForm(form){
    $(form).find('[name="name"]').focus();
    $(form).find('[data-input=true]').each(function(){
      $(this).val($(this).data('default') || '');
    });
  }
	
	/**	
	* Form tasks upon receiving a response from server on whether the form values satisfy
	* the constraints of the model.
	* 
	* @param response: form of {isInputValid:boolean, invalid:array}
	**/
	
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
		onResponse: onResponse
  };
}();


//Private methods

//Takes care of reseting form input values upon successful submit
var resetForm =  function(form){
	$(form).find('[name="name"]').focus();
	$(form).find('[data-input=true]').each(function(){
		$(this).val($(this).data('default') || '');
	});
}
