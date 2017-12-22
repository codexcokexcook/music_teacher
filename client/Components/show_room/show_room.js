import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';
import { navbar_find_by } from '/imports/functions/find_by.js'

Template.show_room.onRendered(function(){
  Meteor.setTimeout( function() {
    $('.map_wrapper').pushpin({
      top: 0,
      bottom: 2000,
      offset: 65
    });
  }, 0);
});

Template.show_room_dish.helpers ({
  'find_dishes_by': function(){
    var kitchen_info = Session.get('searched_result');
    var kitchen_id = [];
    if (kitchen_info) {
      for (i = 0; i < kitchen_info.length; i++) {
        kitchen_id[i] = kitchen_info[i]._id;
      }
    }
    return Dishes.find({kitchen_id: {$in: kitchen_id}, online_status: true, deleted: false});
  }
});

Template.show_room_menu.helpers ({
  'find_menu_by': function(){
    var kitchen_info = Session.get('searched_result');
    var kitchen_id = [];
    if (kitchen_info) {
      for (i = 0; i < kitchen_info.length; i++) {
        kitchen_id[i] = kitchen_info[i]._id;
      }
    }
    return Menu.find({kitchen_id: {$in: kitchen_id}, online_status: true, deleted: false});
  }
});

Template.show_room_chef.helpers ({
  'find_kitchen_by': function(){
    navbar_find_by("Kitchen_details")
    return Session.get('searched_result');
  }
});

// subcribe all publish
Meteor.subscribe('theProfileImages');
Meteor.subscribe('theIngredients');
Meteor.subscribe('theShoppingCart');
Meteor.subscribe('theOrderRecordSeller');
Meteor.subscribe('theOrderRecordBuyer');
Meteor.subscribe('theProfileDetail');
Meteor.subscribe('theKitchenDetail');
Meteor.subscribe('theTransactionSeller');
Meteor.subscribe('theTransactionBuyer');
Meteor.subscribe('theNotificationsSender');
Meteor.subscribe('theNotificationsReceiver');
Meteor.subscribe('theDishes');
Meteor.subscribe('theMenu');
Meteor.subscribe('theImages');
