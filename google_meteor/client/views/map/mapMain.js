if (Meteor.isClient) {
    
    var location = null; 
    var oldLocation = null;
    var locationCircle;
    var driverId = null;
   
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

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position) {
            location = position;

            var driver={
                uid: 5,
                clientId: 5,
                location: location
            }
            Meteor.call('driver', driver, function(error, id){
                if (error)
                    return alert(error.reason);
                driverId = id;
            });
            googleInit();
            
        });
    }
    
    var updateLocation = function (){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                oldLocation = location;
                location = position;
                locationCircle.setCenter(new google.maps.LatLng(location['coords']['latitude'], location['coords']['longitude']));
                if (driverId !== null){
                   Drivers.update(driverId, {$set: {location: location}});
                 }     
            });
        }
    } 
   
    Meteor.setTimeout(function(){
        Meteor.setInterval(updateLocation, 3*1000); 
    }, 3*1000);
}
