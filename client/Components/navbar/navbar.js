import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { FilesCollection } from 'meteor/ostrio:files';


Template.bp_navbar.onRendered(function(){
  //activate dropdown
  this.$('select').material_select();
  //dropdown options
  this.$('.dropdown-button').dropdown({
     inDuration: 300,
     outDuration: 225,
     constrainWidth: false, // Does not change width of dropdown to that of the activator
     hover: true, // Activate on hover
     gutter: 0, // Spacing from edge
     belowOrigin: false, // Displays dropdown below the button
     alignment: 'left', // Displays dropdown with edge aligned to the left of button
     stopPropagation: false // Stops event propagation
   }
 );

 //activate slideNav
 this.$(".navbar_brand_logo").sideNav({
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: false // Choose whether you can drag to open on touch screens,
      //onOpen: function(el) { /* Do Stuff* / }, // A function to be called when sideNav is opened
      //onClose: function(el) { /* Do Stuff* / }, // A function to be called when sideNav is closed
    });

    //activate datepicker
      this.$('.timepicker').pickatime({
    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: true, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Clear', // text for clear-button
    canceltext: 'Cancel', // Text for cancel-button
    autoclose: false, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
    aftershow: function(){} //Function for after opening timepicker
  });

 })

 Template.bp_navbar.helpers ({
   service_option_list:[
     { service_option: 'Pick up', option:'1'},
     { service_option: 'Delivery', option:'2'},
     { service_option: 'Dine in', option:'3'},

   ],
 });

 Template.bp_navbar.events({
   'click #profile_link': function () {
     FlowRouter.go('/profile');
   },

   'click #logout_link': function () {
     Meteor.logout();
     FlowRouter.go('/');
   }
 })
