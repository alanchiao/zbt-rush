ModelValidator = function(data){
	var invalid = [];
	
	function checkNonEmpty(attrName){
		if(data[attrName] === ""){
			invalid.push(attrName);
		}
	}
	
	function checkPositiveNumber(attrName){
		if(data[attrName] === "" || typeof data[attrName] !== 'number' || data[attrName] <= 0){
			invalid.push(attrName);
		}
	}

	function getResponse(){
		if(invalid.length === 0){
			return {isInputValid:true};
		} else {
			return {isInputValid:false, invalid:invalid};
		}
	}

	return {
		checkNonEmpty: checkNonEmpty,
		checkPositiveNumber: checkPositiveNumber,
		getResponse: getResponse
	};
};
