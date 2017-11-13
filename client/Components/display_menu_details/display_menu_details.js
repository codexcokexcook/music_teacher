import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';

Template.display_menu_details.helpers({
  'menu_id': function() {
    var menu_id = FlowRouter.getParam('id');
    return Menu.findOne({"id": menu_id});
  }
})
