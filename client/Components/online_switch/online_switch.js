import { Template } from 'meteor/templating';

Template.online_switch.events({
  'change .online_status': function(instance) {
    var switch_id = '#switch_' + this._id;
    var switch_status = $(switch_id).prop('checked');
    var parent_template = Template.instance().view.parentView.parentView.parentView.name;
    with (parent_template === 'Template.dishes_selection') {
      Meteor.call('dish.online', this._id, switch_status);
    }
    with (parent_template === 'Template.menu_card') {
      Meteor.call('menu.online', this._id, switch_status);
    }
  }
})
