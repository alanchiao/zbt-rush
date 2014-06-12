Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function(){
  this.route('mainQueue', {path: '/'});

});

var requireAdmin = function(){
  if (! Meteor.user()){
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    pause();
  }
}

