if (Meteor.isClient) {
    
    //google-meteor package 
    var googleInit = function(){
        GoogleMaps.init(
            {
                'sensor': false 
            },
            function(){
                var mapOptions = {
                    zoom: 16,
                };
                 
                var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
                var center = new google.maps.LatLng(location['coords']['latitude'], location['coords']['longitude']);
                map.setCenter(center);

                var circleOptions = {
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35,
                    map: map,
                    center: center,
                    radius: 10 
                };

                locationCircle = new google.maps.Circle(circleOptions);
            }
        );
    };
}
