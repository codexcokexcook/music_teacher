import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Blaze } from 'meteor/blaze';

import './login_modal.html';


Template.login_modal.events({
  'click .login-facebook':function(event){
    event.preventDefault();
    $('#loginLoader').show(); // show the loader
    Meteor.loginWithFacebook({requestPermissions:['public_profile','email']}, function(err){
      if (err) {
        $('#loginLoader').hide(); // show the loader
        console.log('Handle errors here: ', err);
      } else {
        $('#loginLoader').hide(); // show the loader
        localStorage.setItem("loggedIn", true);
        FlowRouter.go("/main");
        $('#login_modal').modal('close');
      }
    });
  },
  'click .login-google':function(event){
    event.preventDefault();
    Meteor.loginWithGoogle({}, function(err){
      $('#loginLoader').show(); // show the loader
      if (err) {
        $('#loginLoader').hide(); // show the loader
        console.log('Handle errors here: ', err);
      } else {
        $('#loginLoader').hide(); // show the loader
        localStorage.setItem("loggedIn", true);
        FlowRouter.go("/main");
        $('#login_modal').modal('close');
      }
    });
  },
  'click #login, keypress': function(event){
    if (event.which === 1||event.which === 13){
      $('#loginLoader').show(); // show the loader
      var email = $('#login_email').val();
      var password = $('#login_password').val();
      if (email || password) {
        Meteor.loginWithPassword(email, password, function(error){
          if (error) {
            $('#loginLoader').hide(); // show the loader
            Bert.alert( error.reason, 'danger','growl-top-right');
            return false;
          }
          else if (Meteor.user().emails[0].verified === true){
            $('#loginLoader').hide(); // show the loader
            Bert.alert( 'Welcome!', 'success' );
            localStorage.setItem("loggedIn", true);
            FlowRouter.go("/main");
            $('#login_modal').modal('close');
          } else {
            Meteor.logout(function(err){
             if (err) {
              $('#loginLoader').hide(); // show the loader
               Bert.alert(err.reason, "danger", "growl-top-right");
             } else {
              $('#loginLoader').hide(); // show the loader
               Session.clear();
               Bert.alert( 'Please verify your email before login!', 'danger','growl-top-right' );
             }
           });
          }
        });
      } else {
        return false;
      }
    }
  },
  'click #forgot_password': function() {
    login_content = $('#login_content').remove();
    Blaze.render(Template.forgot_password, $('#login_modal')[0]);
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
