ModelValidator = function(data){
  var invalid = [];
  
  function checkNonEmpty(attrName){
    // if field is empty or starts with * (placeholder indicating requiredness),
    // this is an invalid value for the field
    if(data[attrName] === "" || data[attrName].toString().charAt(0) == "*"){
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
