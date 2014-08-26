Template.map.rendered = function(){
  Meteor.Loader.loadCss('https://api.tiles.mapbox.com/mapbox.js/v2.0.1/mapbox.css');
  Meteor.Loader.loadJs('https://api.tiles.mapbox.com/mapbox.js/v2.0.1/mapbox.js', function(){
    L.mapbox.accessToken = 'pk.eyJ1IjoidmluZWVsIiwiYSI6IlFNdVFXOVkifQ.hIr__TFm_SKAU-5mSruX4g';
    var mapbox = L.mapbox.map('map', 'vineel.i06b0oh9').setView([42.35, -71.11], 15);

    var carLayer = L.layerGroup([]).addTo(mapbox);

    function updateDrivers(){
      ActiveDrivers.find().forEach(function(driver){
        carLayer.clearLayers();

        var lat = parseFloat(driver.lastLatitude);
        var lon = parseFloat(driver.lastLongitude);
        if (!isNaN(lat) && !isNaN(lon)) {
          var marker = L.circleMarker([lat, lon, {color: 'white', fill: true, fillOpacity: 1.0}]);
          carLayer.addLayer(marker);
        }
      });
    }

    setInterval(updateDrivers, 5000);
  });
};

