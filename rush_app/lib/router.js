//Standard routing logic. Iron Router.

Router.configure({
  loadingTemplate:'loading',
  layoutTemplate: 'layout'
});

Router.onBeforeAction('loading');
    
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
    path: '/driver/:_id',
    waitOn: function(){
        /**Must wait for drivers model to be ready before going to drivers page**/
        return Meteor.subscribe('drivers');
    },
    data:function(){
        var driver = Drivers.findOne(this.params._id);
        return driver;
    }
  });
});

