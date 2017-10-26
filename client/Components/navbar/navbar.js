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
     hover: false, // Activate on hover
     gutter: 0, // Spacing from edge
     belowOrigin: true, // Displays dropdown below the button
     alignment: 'left', // Displays dropdown with edge aligned to the left of button
     stopPropagation: false // Stops event propagation
   }
 );

 //activate slideNav
 this.$(".nav_brand_logo").sideNav({
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: false // Choose whether you can drag to open on touch screens,
      //onOpen: function(el) { /* Do Stuff* / }, // A function to be called when sideNav is opened
      //onClose: function(el) { /* Do Stuff* / }, // A function to be called when sideNav is closed
    });

    //activate datepicker
  this.$('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false // Close upon selecting a date,
    });


  //activate timepicker
  this.$('.timepicker').pickatime({
    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Clear', // text for clear-button
    canceltext: 'Cancel', // Text for cancel-button
    autoclose: false, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
    aftershow: function(){} //Function for after opening timepicker
  });

 })

 Template.bp_navbar.helpers ({

   location_option_list:[
     {location_option: 'Home', option:'1'},
     {location_option: 'Office', option:'2'},
     {location_option: 'Pin a location', option:'3'},
   ],

   time_option_list:[
     {time_option: '+ 30 mins', option:'1'},
     {time_option: '+ 1 hour', option:'2'},
     {time_option: '+ 2 hours', option:'3'},
     {time_option: '+ 3 hours', option:'4'},
     {time_option: '+ 4 hours', option:'5'},
     {time_option: '+ 5 hours', option:'6'},
     {time_option: '+ 6 hours', option:'7'},
     {time_option: '+ 7 hours', option:'8'}
   ],


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
   'click #all_link': function () {
     FlowRouter.go('/main');
   },
   'click #create_dish_link': function () {
     FlowRouter.go('/make_dish');
   },
   'click #create_menu_link': function () {
     FlowRouter.go('/create_menu');
   },
   'click #logout_link': function () {
     Meteor.call('messages.clear',Meteor.userId());
     Session.keys = {}
     Meteor.logout();
     FlowRouter.go('/');
   }
 })
