if (navigator.geolocation){
	navigator.geolocation.getCurrentPosition(function(position) {
		console.log(position);
	});
}

if (Meteor.isClient) {
    GoogleMaps.init( 
        {
            'sensor': false
        },
        function(){
            var mapOptions = {
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.SATELLITE
            };
            map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
            map.setCenter(new google.maps.LatLng(35.363556, 138.730438));
        }
    );
}
