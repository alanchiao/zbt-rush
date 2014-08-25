Template.map.helpers({
  cars: function(){
    return Cars.find();
  },
});

Template.map.rendered = function(){
  Meteor.Loader.loadCss('https://api.tiles.mapbox.com/mapbox.js/v2.0.1/mapbox.css');
  Meteor.Loader.loadJs('https://api.tiles.mapbox.com/mapbox.js/v2.0.1/mapbox.js', function(){
    L.mapbox.accessToken = 'pk.eyJ1IjoidmluZWVsIiwiYSI6IlFNdVFXOVkifQ.hIr__TFm_SKAU-5mSruX4g';
    var mapbox = L.mapbox.map('map', 'vineel.i06b0oh9').setView([42.35, -71.11], 15);

    Cars.find().forEach(function(car){
      var marker = L.circleMarker([parseFloat(car.lastLatitude), parseFloat(car.lastLongitude)], {color: 'white', fill: true, fillOpacity: 0.7});
      marker.addTo(mapbox);
    });
  });
};

