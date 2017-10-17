import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Blaze } from 'meteor/blaze';
import { Email } from 'meteor/email'

import './login.html';

Template.login_content.events({
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
    Meteor.loginWithFacebook({}, function(err){
      if (err) {
        console.log('Handle errors here: ', err);
      } else {
        FlowRouter.go("/msgDialog");
        $('#login_modal').modal('close');
      }
    });
  }
});
Template.login.helpers({
  'status': function(){
    return Session.get('status');
  }
});

Template.login.events({
  'click #signup': function(event){
    event.preventDefault();
    var email = trimInput($('#signup_email').val());
    var password = trimInput($('#signup_password').val());
    var cpassword = trimInput($('#signup_cpassword').val());
  //  var last_name = trimInput(event.target.last_name.value);
  //  var first_name = trimInput(event.target.first_name.value);
    if( isNotEmpty(email)      &&
        isNotEmpty(password)   &&
  //      isNotEmpty(last_name)  &&
  //      isNotEmpty(first_name) &&
        isEmail(email)         &&
        areValidPassword(password, cpassword)) {
          Accounts.createUser({
            email: email,
            password: password,
          }, function(err){
            if(err){
              Bert.alert(err.reason,"danger", "growl-top-right");
          } else {
            Blaze.render(Template.verification, document.getElementById('signup_content'));
            $('.signup_form').remove();
            $('#signup').remove();
            Meteor.call('sendVerificationEmail', Meteor.userId());
          }
          });
        }
      return false;
    },
    'click #login': function(events, template){
         event.preventDefault();

         var email = $('#login_email').val();
         var password = $('#login_password').val();

      Meteor.loginWithPassword(email, password, function(error){
        if (error) {
          Bert.alert( error.reason, 'danger','growl-top-right');
          return false;
        }
  //Check if user verified his email
        else if (Meteor.user().emails[0].verified === true){
          Bert.alert( 'Welcome!', 'success' );
          FlowRouter.go("/msgDialog");
          $('#login_modal').modal('close');
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
    }
});


//Validation rules
//Trim Helper
var trimInput = function(value){
  return value.replace(/^\s*|\s*$/g,"");
}

var isNotEmpty = function(value){
  if (value && value !== ''){
    return true;
  }
  Bert.alert("Please fill in all fields", "danger", "growl-top-right");
  return false;
}
//Email Validation
isEmail = function(value){
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if(filter.test(value)){
    return true;
  }
  Bert.alert("Please use a valid email address","danger","growl-top-right")
  return false;
}
//Check Password fields
isValidPassword=function(password){
  if(password.length <8){
  Bert.alert("Password must be a least 8 charaters", "danger","growl-top-right");
    return false;
  }
    return true;
  };
//Match Password
areValidPassword = function(password, cpassword){
  if(!isValidPassword(password)){
    return false;
  }
  if(password !== cpassword){
    Bert.alert("Password do not match","danger","growl-top-right");
    return false;
  }
    return true;
}
