Template.completed.helpers({
  completedRides: function() {
    return Rides.find({
      status: { $in : [Rides.states.COMPLETE_FOUND, Rides.states.COMPLETE_NOT_FOUND]}
    });
  },

  statusClass: function() {
    return ((this.status === Rides.states.COMPLETE_NOT_FOUND) && 'not-found danger') ||
      ((this.status === Rides.states.COMPLETE_FOUND) && 'found');
  }
});

Template.completed.events({
  'click a.show-not-found': function(e) {
    $(e.target).text('Show all completed rides').removeClass('show-not-found').addClass('show-all');
    $('tr.found').hide();
  },

  'click a.show-all': function(e) {
    $(e.target).text('Show only rides that were not found').removeClass('show-all').addClass('show-not-found');
    $('tr.found').show();
  },

  'click a.rides-dump': function(e) {
    $('.rides-dump').hide();
    $('.spinner').show();
    Meteor.call('dumpRidesToEmail', function(error, result) {
      if (error) {
        alert(error);
      } else {
        alert('Done emailing!');
      }
      $('.spinner').hide();
      $('.rides-dump').show();
    });
  }
});
