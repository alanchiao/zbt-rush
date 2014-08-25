Template.map.rendered = function(){
  Meteor.Loader.loadCss('https://api.tiles.mapbox.com/mapbox.js/v2.0.1/mapbox.css');
  Meteor.Loader.loadJs('https://api.tiles.mapbox.com/mapbox.js/v2.0.1/mapbox.js', function(){
    L.mapbox.accessToken = 'pk.eyJ1IjoidmluZWVsIiwiYSI6IlFNdVFXOVkifQ.hIr__TFm_SKAU-5mSruX4g';
    var mapbox = L.mapbox.map('map', 'vineel.i06b0oh9').setView([42.35, -71.11], 15);

    ActiveDrivers.find().forEach(function(driver){
      var marker = L.circleMarker([parseFloat(driver.lastLatitude), parseFloat(driver.lastLongitude)], {color: 'white', fill: true, fillOpacity: 0.7});
      marker.addTo(mapbox);
    });
  });
};

