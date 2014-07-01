(function(){
Template.__define__("ridesList", (function() {
  var self = this;
  var template = this;
  return HTML.DIV({
    "class": "rides"
  }, "\n    ", UI.Each(function() {
    return Spacebars.call(self.lookup("rides"));
  }, UI.block(function() {
    var self = this;
    return [ "\n      ", Spacebars.include(self.lookupTemplate("rideItem")), "\n    " ];
  })), "\n  ");
}));

})();
