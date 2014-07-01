(function(){
Template.__define__("vehiclesList", (function() {
  var self = this;
  var template = this;
  return HTML.DIV({
    "class": "vehicles"
  }, "\n    ", UI.Each(function() {
    return Spacebars.call(self.lookup("vehicles"));
  }, UI.block(function() {
    var self = this;
    return [ "\n      ", Spacebars.include(self.lookupTemplate("vehicleItem")), "\n    " ];
  })), "\n  ");
}));

})();
