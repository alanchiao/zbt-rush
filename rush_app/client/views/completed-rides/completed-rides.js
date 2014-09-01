Template.completed.helpers({
  completedRides: function() {
    return Rides.find({
      status: { $in : [Rides.states.COMPLETE_FOUND, Rides.states.COMPLETE_NOT_FOUND] },
    }, {
      sort: { 'time' : 1, 'name' : 1 }
    });
  },

  statusClass: function() {
    var classes = [];
    if (this.status === Rides.states.COMPLETE_NOT_FOUND) {
      classes.push('not-found');
      classes.push('danger');
    }
    if (this.status === Rides.states.COMPLETE_FOUND) {
      classes.push('found');
    }
    if (this.xrush) {
      classes.push('xrush');
    }
    return classes.join(' ');
  }
});

Template.completed.events({
  'click a.show-all': function(e) {
    $('tr').show();
    $('.completed-filters input[type=checkbox]').prop('checked', false);
  },

  'click .completed-filters input[type=checkbox]': function(e) {
    $('tr').show();
    var showClasses = $('.completed-filters')
      .find('input[type=checkbox]')
      .filter(function(index, item) { return $(item).prop('checked'); })
      .map(function(index, item) { return $(item).data('show'); })
      .toArray();

    if (showClasses.length) {
      $('tr:not(.header').each(function() {
        var elt = this;
        if (!showClasses.every(function(classname) {
          return $(elt).hasClass(classname);
        })) {
          $(elt).hide();
        }
      });
    }
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
