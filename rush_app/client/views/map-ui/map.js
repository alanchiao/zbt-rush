Template.map.rendered = function(){
  Meteor.Loader.loadCss('https://api.tiles.mapbox.com/mapbox.js/v2.0.1/mapbox.css');
  Meteor.Loader.loadJs('https://api.tiles.mapbox.com/mapbox.js/v2.0.1/mapbox.js', function(){
    L.mapbox.accessToken = 'pk.eyJ1IjoidmluZWVsIiwiYSI6IlFNdVFXOVkifQ.hIr__TFm_SKAU-5mSruX4g';
    var mapbox = L.mapbox.map('map', 'vineel.i06b0oh9').setView([42.35, -71.11], 15);

    var carLayer = L.layerGroup([]).addTo(mapbox);


    function updateDrivers(){
      carLayer.clearLayers();
      ActiveDrivers.find().forEach(function(driver){
        var delta = new Date(utils.getCurrentTime()) - new Date(driver.lastPingTime);
        // Check if we've heard from the car in the last 5 minutes
        if (delta < 5 * 60 * 1000) {
          var lat = parseFloat(driver.lastLatitude);
          var lon = parseFloat(driver.lastLongitude);
          if (!isNaN(lat) && !isNaN(lon)) {
            // Determine color of dot based on last ping time
            var color = delta < 2 * 60 * 1000 ? 'green' : 'yellow';
            var marker = L.circleMarker([lat, lon], {color: color, fill: true, fillOpacity: 1.0});
            var driv = Drivers.findOne({_id: driver.driverId});
            var car = Cars.findOne({_id: driver.carId});
            marker.bindPopup(driv.name + " " + car.name);
            carLayer.addLayer(marker);
          }
        }
      });
    }

    setInterval(updateDrivers, 5000);
  });
};

