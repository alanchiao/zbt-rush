/**
* Standard routing logic. Iron Router.
*
* GET  /                           : main page for administrative control by rick
* GET  /map								         : get map with all active drivers displayed
* GET  /create                       : page for CRUD administration of cars
* GET  /drivers/:id          : main page for active driver app usage
* GET  /drivers/json         : get json version of all drivers
* POST /drivers/:id/location : update driver location   
**/
Router.configure({
  loadingTemplate:'loading',
  layoutTemplate: 'layout'
});

Router.onBeforeAction(function(){
	this.render('loading')
}, {except: ['driversJSON', 'driverLocation']});
    
Router.map(function(){
  this.route('rick', {
		path: '/',
		waitOn: function(){
			/**Must wait for rides model to be ready in order to retrieve the ride objects under
			a driver that match the riders ids**/
			return Meteor.subscribe('rides'); 
		}
	});
	//I hope that the id of an active driver is never 'json'
	this.route('driversJSON', {
		path: '/drivers/json',
		where: 'server',
		waitOn: function(){
			return Meteor.subscribe('activeDrivers');
		},
		action: function(){
			var activeDrivers = ActiveDrivers.find().fetch();
			activeDrivers.forEach(function(driver){
				driver.driverContent = Drivers.findOne(driver.driverId);
				driver.carContent = Cars.findOne(driver.carId);
			});
			this.response.setHeader('Content-Type', 'application/json');
			this.response.end(JSON.stringify(activeDrivers));
		}
	});
  this.route('driver', {
    path: '/drivers/:_id',
    waitOn: function(){
        return Meteor.subscribe('activeDrivers');
    },
    data:function(){
        var driver = ActiveDrivers.findOne(this.params._id);
        return driver;
    }
  });
	this.route('driverLocation', {
		path: '/drivers/:_id/location',
		where: 'server',
		action: function(){
			var data = this.request.body;
			var accuracy;
			if("accuracy" in data){
				accuracy = data.accuracy;
			}
			else {
				accuracy = null;
			}

			ActiveDrivers.update(this.params._id, {
				$set: {
					lastLongitude: data.longitude,
					lastLatitude: data.latitude,
					lastPingTime: utils.getCurrentTime(),
					lastAccuracy: accuracy
				}
			});
		}
	});
	this.route('create',{
		path: '/create',
		waitOn: function(){
			return Meteor.subscribe('cars');
		}
	});
	this.route('map',{
		path: '/map',
		waitOn: function(){
			return Meteor.subscribe('cars');
		}
	});
});

