import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';

import './signUp.html';

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
Template.signup_content.events({
  'submit form': function(events, template){
       event.preventDefault();

       let user = {
      email: template.find( '[name="email"]' ).value,
      password: template.find( '[name="password"]' ).value
    };


    Accounts.createUser( user, ( error ) => {
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
        Meteor.call( 'sendVerificationLink', ( error, response ) => {
          if ( error ) {
            Bert.alert( error.reason, 'danger' );
          } else {
            Bert.alert( 'Welcome!', 'success' );
          }
        });
      }
    });
  }
});
