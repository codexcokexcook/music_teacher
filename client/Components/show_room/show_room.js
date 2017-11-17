import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { FilesCollection } from 'meteor/ostrio:files';
import { navbar_find_by } from '/imports/functions/find_by.js'

Template.show_room.onRendered(function(){
  $('.map_wrapper').pushpin({
    top: 0,
    bottom: 2000,
    offset: 85
  });
});

Template.show_room_dish.helpers ({
  'find_dishes_by': function(){
    return navbar_find_by("Dishes")
      }
})

Template.show_room_menu.helpers ({
  'find_menu_by': function(){
    return navbar_find_by("Menu")

      }
})

Template.show_room_chef.helpers ({
  'find_kitchen_by': function(){
    return navbar_find_by("Kitchen_details")
      }
})
