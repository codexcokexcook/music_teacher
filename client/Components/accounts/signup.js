import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './signup.html';

Template.signup_content.onRendered(function(){
  $('#login_modal').modal();
});

Template.signup_content.events({
  'click .login-facebook':function(event){
    event.preventDefault();
    Meteor.loginWithFacebook({requestPermissions:['public_profile','email']}, function(err){
      if (err) {
        console.log('Handle errors here: ', err);
      } else {
        FlowRouter.go("/msgDialog");
        $('#login_modal').modal('close');
      }
    });
  },
  'click .login-google':function(event){
    event.preventDefault();
    Meteor.loginWithGoogle({}, function(err){
      if (err) {
        console.log('Handle errors here: ', err);
      } else {
        FlowRouter.go("/msgDialog");
        $('#login_modal').modal('close');
      }
    });
  }
});
