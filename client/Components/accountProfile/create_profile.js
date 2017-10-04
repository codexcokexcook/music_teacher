import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';


import './create_profile.html';

Template.create_profile.events({

  'submit form': function(event){
    event.preventDefault();







    }
  });



Template.create_profile.onRendered(function(){

  //activate datepicker
  this.$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 200, // Creates a dropdown of 15 years to control year,
    today: 'TODAY',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });

  //activate dropdown
  this.$('select').material_select();

  //activate characterCounter
  this.$('input#input_text, textarea#about_myself').characterCounter();

});
