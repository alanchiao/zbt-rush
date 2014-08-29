Drivers = new Meteor.Collection('drivers');

Drivers.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});

Drivers.validate = function(data){
	var validator = ModelValidator(data);
	validator.checkNonEmpty('name');
	validator.checkNonEmpty('phone');
	return validator.getResponse();
};

Meteor.methods({
  /** 
  * Create driver
  *
  * Format of driver attributes:
  * - name: string
  * - phone: (***)-(***)-(****)
	*
	* UI-Related attributes:
	* - isAssigned: if driver is 'assigned' to be active 
  **/
  driver: function(attributes){
    var driver = _.defaults(attributes, {
			isAssigned:false	
		});
		var response = Drivers.validate(driver);
		if(response.isInputValid === true){
			response.driverId = Drivers.insert(driver);
		}
		return response;
  },
	updateDriver: function(driver){
		var response = Drivers.validate(driver);
		return response;
	}
});

