import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.profile_created_menus.onRendered(function(){
  $('.dropdown_element').hide();
  $('.modal').modal()
});

Template.profile_created_dishes.helpers({
  'created_dishes': function() {
    var user_id = this.user_id;
    return Dishes.find({user_id: user_id});
  }
});

Template.profile_created_menus.helpers({
  'created_menus': function() {
    var user_id = this.user_id;
    return Menu.find({user_id: user_id});
  }
});

Template.foodie_profile_card.onRendered(function(){
  $('body').css('overflow-y','scroll');
})

Template.homecook_profile_page.onRendered(function(){
  $('body').css('overflow-y','scroll');
  $('a.homecook_image').remove();
});

Template.profile_created_menus.onRendered(function(){
  $('a.homecook_image').remove();
})

Template.profile_created_dishes.onRendered(function(){
  $('a.homecook_image').remove();
})

Template.foodie_profile_card.helpers({
  'user_id': function() {
    var user_id = FlowRouter.getParam('user_id');
    Session.set('user_id', user_id);
    return Profile_details.findOne({user_id: user_id});
  }
})

Template.homecook_profile_page.helpers({
  'homecook_id': function() {
    var homecook_id = FlowRouter.getParam('homecook_id');
    Session.set('user_id', homecook_id);
    return Kitchen_details.findOne({user_id: homecook_id});
  }
});
