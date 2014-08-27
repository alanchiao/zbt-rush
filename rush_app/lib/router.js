/**
* Standard routing logic. Iron Router.
*
* GET  /                     : main page for administrative control by rick
* GET  /map								   : get map with all active drivers displayed
* GET  /create               : page for CRUD administration of cars
* GET  /drivers/:id          : main page for active driver app usage - id is that of driver
* GET  /drivers/json         : get json version of all active drivers
* POST /drivers/:id/location : update driver location  - id is that of active driver 
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
			var activeDriverDetails = [];
			activeDrivers.forEach(function(driver){
				activeDriverDetails.push({
					_id: driver._id,
					driverId: driver.driverId,
					driverContent: Drivers.findOne(driver.driverId),
					carContent:Cars.findOne(driver.carId)
				});
			});

			var headers = {'Content-Type': 'application/json'};
			this.response.writeHead(200, headers);
			this.response.end(JSON.stringify(activeDriverDetails));
		}
	});
  this.route('driver', {
    path: '/drivers/:_id',
    data:function(){
        var driver = ActiveDrivers.findOne({driverId: this.params._id});
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
			var headers={};
			this.response.writeHead(200, headers);
			this.response.end();
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

