// module for useful functions, etc
utils = function () {
	return {
		formToJson: function (form) {
			// converts a submitted form into a key-value map, so we can add more fields if needed
			// key is element.name, value is element.value
			var result = {};
			var array = $(form).serializeArray();
			for (var i=0; i < array.length; i++) {
				result[array[i].name] = array[i].value;
			}
			return result;
		}
	}
}();