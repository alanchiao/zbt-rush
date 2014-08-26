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
		navigator.geolocation.getCurrentPosition(function(position){
			var latitude  =  position['coords']['latitude'];
			var longitude =  position['coords']['longitude'];
			Meteor.http.call("POST", window.location.href + '/location',
				{data: 
				  {
				  	longitude:longitude,
						latitude:latitude		
				  }
				},
				function(error, result){}
			);
			
		});
	}
	Meteor.setInterval(updateLocation, 5*1000);
}
