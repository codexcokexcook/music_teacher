import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import './edit_profile.html';


Template.edit_foodie_profile.helpers ({

  'check_gender': function(){
    var profile_details = Profile_details.findOne({'user_id': Meteor.userId()});
    var gender = profile_details.gender
    if (gender === "male"){
      return true
    }

  }

})

Template.edit_foodie_profile.onRendered(function(){

  //activate dropdown
  this.$('select').material_select();

  //activate characterCounter
  this.$('input#input_text, textarea#about_myself').characterCounter();

  //activate the selection tabs
  this.$(document).ready(function(){
    $('ul.tabs').tabs();
  });

});
