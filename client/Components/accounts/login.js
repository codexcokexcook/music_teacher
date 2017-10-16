import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './login.html';


Template.login_content.events({
  'submit form': function(events, template){
       event.preventDefault();

       var email = event.target.email.value;
       var password = event.target.password.value;

    Meteor.loginWithPassword(email, password, function(error){
      if (error) {
        Bert.alert( error.reason, 'danger','growl-top-right');
        return false;
      }
//Check if user verified his email
      else if (Meteor.user().emails[0].verified === true){
        Bert.alert( 'Welcome!', 'success' );
        FlowRouter.go("/msgDialog");
      }
      else {
//log out user when his email not verified
        Meteor.logout(function(err){
         if (err) {
           Bert.alert(err.reason, "danger", "growl-top-right");
         } else {
           Session.clear();
           Bert.alert( 'Please verify your email before login!', 'danger','growl-top-right' );
         }
       })
      }
    });
    return false;
  },
  'click .login-facebook':function(event){
    event.preventDefault();
    Meteor.loginWithFacebook({requestPermissions:['public_profile','email']}, function(err){
      if (err) {
        console.log('Handle errors here: ', err);
      } else {
        FlowRouter.go("/msgDialog");
      }
    });
  },
  'click .login-google':function(event){
    event.preventDefault();
    Meteor.loginWithFacebook({}, function(err){
      if (err) {
        console.log('Handle errors here: ', err);
      } else {
        FlowRouter.go("/msgDialog");
      }
    });
  }
});
