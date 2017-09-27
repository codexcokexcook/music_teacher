import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './login.html';

/*//Validation - Not working
Template.signup.onRendered(function(){

  this.$("#signup_form").validate({
        rules: {
            first_name: {
                required: true
            },
            last_name: {
                required: true
            },
            email: {
                required: true,
                email:true
            },
            password: {
				        required: true,
				        minlength: 8
			      },
			      cpassword: {
				        required: true,
				        minlength: 8,
				        equalTo: "#password"
			      }
        },
        //For custom messages
       messages: {
           first_name:{
               required: "Enter your First Name",

           },
           last_name:{
               required: "Enter your Last Name",

           },

       errorElement : 'div',
       errorPlacement: function(error, element) {
         var placement = $(element).data('error');
         if (placement) {
           $(placement).append(error)
         } else {
           error.insertAfter(element);
         }
       }
}
});
});
*/
Template.login_content.events({

  'submit form': function(events, template){
       event.preventDefault();

       var email = event.target.email.value;
       var password = event.target.password.value;


    Meteor.loginWithPassword(email, password, function(error){
      if (error) {

        Bert.alert( error.reason, 'danger','growl-top-right');
        console.log("3");
        return false;

      } else {
            console.log("4");
            Bert.alert( 'Welcome!', 'success' );
            FlowRouter.go("/msgDialog");

          }
        });
        return false;
        console.log("5");

      }

    });
