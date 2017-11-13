import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';

Template.display_menu_details.helpers({

  'get_menu_id': function() {
    var menu_id = FlowRouter.getParam('menu_id');
    var menu_details = Menu.findOne({"_id": menu_id});
    if (menu_details) {
      var dishes_id = menu_details.dishes_id;
      var dishes_details=[];
      for (i=0; i < dishes_id.length; i++) {
        dishes_details[i] = Dishes.findOne({_id: dishes_id[i]});
      };
      return dishes_details;
    } else {
      return false;
    }
  }
});
