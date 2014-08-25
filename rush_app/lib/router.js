/**
* Standard routing logic. Iron Router.
*
* GET  /                           : main page for administrative control by rick
* GET  /map								         : get map with all active drivers displayed
* GET  /cars                       : page for CRUD administration of cars
* GET  /activeDrivers/:id          : main page for active driver app usage
* GET  /activeDrivers/json         : get json version of all drivers
* POST /activeDrivers/:id/location : update driver location   
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
  this.route('driver', {
    path: '/activeDrivers/:_id',
    waitOn: function(){
        /**Must wait for drivers model to be ready before going to drivers page**/
        return Meteor.subscribe('drivers');
    },
    data:function(){
        var driver = ActiveDrivers.findOne(this.params._id);
        return driver;
    }
  });
	this.route('cars',{
		path: '/cars',
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
	this.route('driversJSON', {
		path: '/activeDrivers/json',
		where: 'server',
		waitOn: function(){
			return Meteor.subscribe('activeDrivers');
		},
		action: function(){
			var drivers = ActiveDrivers.find().fetch();
			this.response.setHeader('Content-Type', 'application/json');
			this.response.end(JSON.stringify(drivers));
		}
	});
	this.route('driverLocation', {
		path: '/activeDrivers/:_id/location',
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
});

