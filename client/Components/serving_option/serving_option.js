import {
  get_checkboxes_value
} from '/imports/functions/get_checkboxes_value.js';

Template.serving_option.helpers({
  serving_option_list: [{
      name: 'Delivery',
      file_name: 'Delivery'
    },
    {
      name: 'Dine-in',
      file_name: 'Dine-in'
    },
    {
      name: 'Pick-up',
      file_name: 'Pick-up'
    },
  ],
});

Template.serving_option.events({
  'change .filled-in': function(event, template) {
    get_checkboxes_value('serving_option_tags', template);
  }
});

Template.serving_option_display.onCreated( function(){
  this.serving_option_list = this.subscribe('getServingOptionList');
});

Template.serving_option_display.helpers({
  'serving_option_list': function() {
    return Kitchen_details.findOne({user_id: Meteor.userId()}).serving_option
  }
});

Template.serving_option_display.events({
  'change .filled-in': function(event, template) {
    get_checkboxes_value('serving_option_tags', template);
  }
});

Template.edit_serving_option_menu.onCreated( function(){
  this.serving_option_list = this.subscribe('getServingOptionList');
});

Template.edit_serving_option_menu.helpers({
  'serving_option_list': function() {
    return Kitchen_details.findOne({user_id: Meteor.userId()}).serving_option
  },
  'is_checked': function() {
    serving_option = Session.get('serving_option_tags');
    if (serving_option.includes(String(this))) {
      return checked="checked";
    }
  }
});

Template.edit_serving_option_menu.events({
  'change .filled-in': function(event, template) {
    get_checkboxes_value('serving_option_tags', template);
  }
});
