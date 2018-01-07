import { Template } from 'meteor/templating';

Template.rating_input.helpers({
  'input_rating': function(event, template) {
    return Session.get('rating');
  }
});

Template.rating_input.events({
  'change #rating': function(event, template) {
    Session.set('rating', template.$('#rating').data('userrating'))
    Meteor.call('rating.insert', Session.get('rating')) //order_id has to be added later when integrated with order_tracking template
  }
});

Template.rating_display.helpers({
  'display_rating': function(event, template) {
    return this.average_rating;
  }
});
