/**
* Standard routing logic. Iron Router.
*
* GET  /                  : main page for administrative control by rick
* GET  /drivers/:id       : main page for driver app usage
* GET  /cars              : page for CRUD administration of cars
* GET  /cars/json         : get json version of all cars
* POST /cars/:id/location : update car location   
**/
Router.configure({
  loadingTemplate:'loading',
  layoutTemplate: 'layout'
});

Router.onBeforeAction(function(){
	this.render('loading')
}, {except: ['carsJSON', 'carLocation']});
    
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
    path: '/drivers/:_id',
    waitOn: function(){
        /**Must wait for drivers model to be ready before going to drivers page**/
        return Meteor.subscribe('drivers');
    },
    data:function(){
        var driver = Drivers.findOne(this.params._id);
        return driver;
    }
  });
	this.route('cars',{
		path: '/cars',
		waitOn: function(){
			return Meteor.subscribe('cars');
		}
	});
	this.route('carsJSON', {
		path: '/cars/json',
		where: 'server',
		waitOn: function(){
			return Meteor.subscribe('cars');
		},
		action: function(){
			var cars = Cars.find().fetch();
			this.response.setHeader('Content-Type', 'application/json');
			this.response.end(JSON.stringify(cars));
		}
	});
	this.route('carLocation', {
		path: '/cars/:_id/location',
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
			Cars.update(this.params._id, {
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

