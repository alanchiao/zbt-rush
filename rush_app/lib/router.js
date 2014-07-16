Router.configure({
  loadingTemplate:'loading',
  layoutTemplate: 'layout'
});

Router.onBeforeAction('loading');
    
Router.map(function(){

  this.route('rick', {path: '/'});
  this.route('driver', {
    path: '/driver/:_id',
    waitOn: function(){
        return Meteor.subscribe('drivers');
    },
    data:function(){
        var driver = Drivers.findOne(this.params._id);
        return driver;
    }
  });
});

