Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function(){

  this.route('rick', {path: '/'});
  this.route('driver', {path: '/driver'});
});


