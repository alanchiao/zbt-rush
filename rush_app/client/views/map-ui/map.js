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
					
					var marker;
          if (!isNaN(lat) && !isNaN(lon)) {
            // Determine color of dot based on last ping time
            color = delta < 2 * 60 * 1000 ? 'green' : 'yellow';
            marker = L.circleMarker(
              [lat, lon],
              {color: color, fill: true, fillOpacity: 1.0, radius: 5}
            );
            var driv = Drivers.findOne({_id: driver.driverId});
            var car = Cars.findOne({_id: driver.carId});

						var rides = Rides.find({_id: {$in: driver.rideIds}});
						var totalPassengers = 0;
						rides.forEach(function(ride){
							totalPassengers += ride.passengers;
						});
						
						var popup = L.popup()
							.setLatLng(L.latLng([lat, lon]))
							.setContent(driv.name + "\n" +  totalPassengers + "/" + car.capacity + "\n" + driver.status);
						
            carLayer.addLayer(marker);
						carLayer.addLayer(popup);

					if (driver.lastAccuracy > 100) {
						// the inner circle has radius 5, and tolerates up to 100m of accuracy
						// so scale so that the outer circle will have at most radius 50
						// Depending on map scale (is that detectable)
						// this may be a better solution https://www.mapbox.com/mapbox.js/api/v1.6.1/l-circle/ (different version than 2.0.1)
						var accuracyRadius = Math.min(driver.lastAccuracy, 1000) / 1000 * 50;
						var accuracyMarker = L.circleMarker(
							[lat, lon],
							{color: color, fill: true, fillOpacity: 0.3, radius: accuracyRadius
						});
							carLayer.addLayer(accuracyMarker);  
						}
					}
        }
      });
    }
    setInterval(updateDrivers, 5000);
  });
};
