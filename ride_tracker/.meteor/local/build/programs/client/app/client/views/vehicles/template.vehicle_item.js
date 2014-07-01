(function(){
Template.__define__("vehicleItem", (function() {
  var self = this;
  var template = this;
  return HTML.DIV({
    "class": "vehicle col-xs-12"
  }, "\n    	", HTML.DIV({
    "class": "row"
  }, "\n    		", HTML.DIV({
    "class": "vehicle-info col-xs-3 col-xs-offset-2"
  }, "\n    			", HTML.DIV({
    "class": "row"
  }, "\n	    			", HTML.DIV({
    "class": "name col-xs-12"
  }, function() {
    return Spacebars.mustache(self.lookup("name"));
  }, " (", function() {
    return Spacebars.mustache(self.lookup("passengers"));
  }, "/", function() {
    return Spacebars.mustache(self.lookup("capacity"));
  }, ")"), "\n	    		"), "\n	    		", HTML.DIV({
    "class": "row"
  }, "\n	    			", HTML.DIV({
    "class": "phone col-xs-12"
  }, function() {
    return Spacebars.mustache(self.lookup("phone"));
  }), "\n	    		"), "\n	    	"), "\n	    	", HTML.DIV({
    "class": "location col-xs-7"
  }, function() {
    return Spacebars.mustache(self.lookup("location"));
  }), "\n	    "), "\n	    ", HTML.DIV({
    "class": "row"
  }, "\n	    	", HTML.DIV({
    "class": "rides col-xs-12"
  }, "\n		    	", UI.Each(function() {
    return Spacebars.call(self.lookup("rides"));
  }, UI.block(function() {
    var self = this;
    return [ "\n			    	", Spacebars.include(self.lookupTemplate("rideItem")), "\n			    " ];
  })), "\n		    "), "\n	    "), "\n	");
}));

})();
