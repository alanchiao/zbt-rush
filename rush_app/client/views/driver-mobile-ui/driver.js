Template.driver.helpers({
  isDriverWaiting: function(){
    return this.status === ActiveDrivers.states.WAITING;
  },
  isDriverUnacked: function(){
    return this.status === ActiveDrivers.states.UNACKED;
  },
  isDriverAcked: function(){
    return this.status === ActiveDrivers.states.ACKED;
  }
});

if(window.location.pathname.match('/drivers/.*$') && navigator && !navigator.userAgent.match(/Android/i)){
	var updateLocation = function(){
    console.log('updating location');
		navigator.geolocation.getCurrentPosition(function(position){
			var latitude  =  position['coords']['latitude'];
			var longitude =  position['coords']['longitude'];
			var hrefParts = window.location.href.split("/");
			var activeDriverId = ActiveDrivers.findOne({driverId:hrefParts[hrefParts.length-1]})._id;
			console.log(activeDriverId);
			Meteor.http.call("POST", "http://" + window.location.host + '/drivers/' + activeDriverId + '/location',
				{data:
				  {
				  	longitude:longitude,
						latitude:latitude,
            pingtime: utils.getCurrentTime()
				  }
				},
				function(error, result){}
			);
		});
	}
	Meteor.setInterval(updateLocation, 20*1000);
}
