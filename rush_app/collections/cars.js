Cars = new Meteor.Collection("cars");

Cars.allow({
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

Cars.validate = function(data){
	var validator = ModelValidator(data);
	validator.checkNonEmpty('name');
	validator.checkNonEmpty('description');
	validator.checkPositiveNumber('capacity');
	return validator.getResponse();
};

Meteor.methods({
  /**
  * Create car
  *
  * Format of car attributes:
  * - name
  * - description
  * - capacity
	* - driver
  * - allowedDrivers
  * - lastPingTime, lastLatitude, lastLongitude
	*
	* UI-Related attributes:
	* - editing
  **/
  car: function(attributes){
    var car = _.defaults(_.extend(attributes, {
    }), {
      allowedDrivers: [],
      lastPingTime: null,
      lastLatitude: null,
      lastLongitude: null,
      editing: false
    });
		var response = Cars.validate(car);
		if(response.isInputValid === true){
			response.carId = Cars.insert(car);
		}
		return response;
  },

	editCar: function(carId, attributes){
		var response = Cars.validate(attributes);
		if(response.isInputValid === true){
			Cars.update(carId, {$set: attributes}, function(error){
				if(error){throwError(error.reason)};		
			});	
		}
		return response;
	}
});
