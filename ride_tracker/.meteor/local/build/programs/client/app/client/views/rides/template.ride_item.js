(function(){
Template.__define__("rideItem", (function() {
  var self = this;
  var template = this;
  return HTML.DIV({
    "class": "ride col-xs-12"
  }, "\n    	", HTML.DIV({
    "class": "row"
  }, "\n	    	", HTML.DIV({
    "class": "time col-xs-2"
  }, function() {
    return Spacebars.mustache(self.lookup("time"));
  }), "\n	    	", HTML.DIV({
    "class": "rider-info col-xs-3"
  }, "\n	    		", HTML.DIV({
    "class": "row"
  }, "\n	    			", HTML.DIV({
    "class": "name col-xs-12"
  }, function() {
    return Spacebars.mustache(self.lookup("name"));
  }, " (", function() {
    return Spacebars.mustache(self.lookup("passengers"));
  }, ")"), "\n	    		"), "\n	    		", HTML.DIV({
    "class": "row"
  }, "\n	    			", HTML.DIV({
    "class": "phone col-xs-12"
  }, function() {
    return Spacebars.mustache(self.lookup("phone"));
  }), "\n	    		"), "\n	    	"), "\n	    	", HTML.DIV({
    "class": "status col-xs-3"
  }, function() {
    return Spacebars.mustache(self.lookup("status"));
  }), "\n	    	", HTML.DIV({
    "class": "location-info col-xs-4"
  }, function() {
    return Spacebars.mustache(self.lookup("pickup"));
  }, " -> ", function() {
    return Spacebars.mustache(self.lookup("dropoff"));
  }), "\n	    "), "\n	    ", HTML.DIV({
    "class": "row"
  }, "\n	    	", HTML.DIV({
    "class": "comments col-xs-12"
  }, function() {
    return Spacebars.mustache(self.lookup("comments"));
  }), "\n	    "), "\n	");
}));

})();
