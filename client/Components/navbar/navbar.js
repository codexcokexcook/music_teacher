import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { FilesCollection } from 'meteor/ostrio:files';
import { Tracker } from 'meteor/tracker';
import { get_current_location } from '/imports/functions/get_current_location.js';

Template.bp_navbar.onRendered(function(){
  //dropdown options
  this.$('.dropdown-button').dropdown({
     inDuration: 300,
     outDuration: 225,
     constrainWidth: false, // Does not change width of dropdown to that of the activator
     hover: false, // Activate on hover
     gutter: 0, // Spacing from edge
     belowOrigin: true, // Displays dropdown below the button
     alignment: 'left', // Displays dropdown with edge aligned to the left of button
     stopPropagation: true // Stops event propagation
   }
 );

 //activate slideNav
 this.$(".nav_brand_logo").sideNav({
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: false // Choose whether you can drag to open on touch screens,
      //onOpen: function(el) { /* Do Stuff* / }, // A function to be called when sideNav is opened
      //onClose: function(el) { /* Do Stuff* / }, // A function to be called when sideNav is closed
    });


  // activate location dropdown based on addresses available in profile details
  Tracker.autorun(()=> {
    this.$('select').material_select();
    var profile_details = Profile_details.findOne({user_id: Meteor.userId()});
    if (profile_details) {
      $('#home_location').val(profile_details.home_address);
      $('#office_location').val(profile_details.office_address);
      $('#pin_location').val("pin_location");
      if (profile_details.home_address && profile_details.office_address) {
        this.$('select').material_select();
        $('#home_location').val(profile_details.home_address);
        $('#office_location').val(profile_details.office_address);
        $('#pin_location').val("pin_location");
      } else if (!profile_details.home_address) {
        $('#home_location').prop('disabled', true);
        $('select').material_select();
        $('#office_location').val(profile_details.office_address);
        $('#pin_location').val("pin_location");
      } else if (!profile_details.office_address){
        $('#office_location').prop('disabled', true);
        this.$('select').material_select();
        $('#home_location').val(profile_details.home_address);
        $('#pin_location').val("pin_location");
      } else {
        $('#home_location').prop('disabled', true);
        $('#office_location').prop('disabled', true);
        this.$('select').material_select();
        $('#pin_location').val("pin_location");
      }
    } else {
      $('#home_location').prop('disabled', true);
      $('#office_location').prop('disabled', true);
      this.$('select').material_select();
      $('#pin_location').val("pin_location");
    }
    if (!navigator.geolocation) {
      $('#current_location').prop('disabled', true);
      this.$('select').material_select();
    }
  });
});

Template.bp_navbar.helpers ({
 location_option_list:[
   {location_option: 'Home', option:'Home', id:'home_location'},
   {location_option: 'Office', option:'Office', id:'office_location'},
   {location_option: 'Current location', option:'current_location', id:'current_location'},
   {location_option: 'Input custom location', option:'Input custom location', id:'pin_location'},
 ],
 service_option_list:[
   { service_option: 'Pick-up', option:'Pick-up'},
   { service_option: 'Delivery', option:'Delivery'},
   { service_option: 'Dine-in', option:'Dine-in'},
 ],
   "check_shopping_cart": function(){
     var total_item_in_cart = 0;
     Shopping_cart.find({"buyer_id": Meteor.userId()}).map(function(doc) {
       total_item_in_cart += parseInt(doc.quantity);
     });
     return total_item_in_cart;
   }
});

Template.bp_navbar.events({
  'click .dropdown-button': function() {
    $('.dropdown-button').dropdown('open');
  },
 'click #profile_link': function () {
   FlowRouter.go('/profile');
 },
 'click #all_link': function () {
   FlowRouter.go('/main');
 },
 'click #i_wanna_cook': function () {
   FlowRouter.go('/cooking');
 },
 'click #logout_link': function () {
   Meteor.call('messages.clear',Meteor.userId());
   Session.keys = {}
   Meteor.logout();
   FlowRouter.go('/');
 },
 'change #by_place': function(event, template){
   var location_value = $(event.currentTarget).val();
   if (location_value === "pin_location") {
     if ($('#location_search_input_card').length < 1) {
       Blaze.render(Template.location_search_card,$('#nav_sarch')[0]);
     };
     $('#location_search_input').focus(function(){
       $(this).select();
     });
    } else if (location_value === "current_location") {
      get_current_location();
    } else {
     Session.set('address', location_value);
   }
 },
 'change #by_method': function(event, template){
   Session.set('method', $(event.currentTarget).val());
 },
 'blur #location_search_input_card': function(event) {
   if ($('#location_search_input_card').length > 0) {
     $(event.currentTarget).remove();
   }
 }
});
