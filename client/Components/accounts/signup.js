import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './signup.html';


Template.signup_content.onRendered(function(){
this.$('.modal').modal();
});

Template.signup_content.events({
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

  'submit form': function(event){
    event.preventDefault();


    var email = trimInput(event.target.email.value);
    var password = trimInput(event.target.password.value);
    var cpassword = trimInput(event.target.cpassword.value);
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
                        }
                else{
                  Bert.alert("Accounts Created!", "success", 'growl-top-right');
                  FlowRouter.go("/sent_verification");
                  }
            });

      }

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
