(function(){
UI.body.contentParts.push(UI.Component.extend({render: (function() {
  var self = this;
  return HTML.DIV({
    id: "main",
    "class": "container"
  }, HTML.Raw("\n    <h2>Rides</h2>\n    "), HTML.DIV({
    id: "rides"
  }, "\n      ", Spacebars.include(self.lookupTemplate("ridesList")), "\n    "), HTML.Raw("\n    <h2>Vehicles</h2>\n    "), HTML.DIV({
    id: "vehicles"
  }, "\n      ", Spacebars.include(self.lookupTemplate("vehiclesList")), "\n    "), "\n  ");
})}));
Meteor.startup(function () { if (! UI.body.INSTANTIATED) { UI.body.INSTANTIATED = true; UI.DomRange.insert(UI.render(UI.body).dom, document.body); } });

})();
