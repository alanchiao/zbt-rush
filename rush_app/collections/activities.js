Activities = new Meteor.Collections('activities');

Activities.methods({
    activity: function(attributes){
        var activity = _.extend(_.pick(attributes, 'name', 'location', 'time', 'description'));

        var activityId = Activities.insert(activity);

        return activityId;
});
