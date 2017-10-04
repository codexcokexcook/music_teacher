import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { Mongo } from 'meteor/mongo';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';



Template.sent_verification_content.onRendered(function(){

  var user = Meteor.userId()

  console.log(user);

Meteor.call('sendVerificationEmail', user)


//log out user after sending verification email
Meteor.logout(function(err){
 if (err) {
   console.log("Log OUT FAILED");
   Bert.alert(err.reason, "danger", "growl-top-right");
 } else {
   Session.clear();
   Bert.alert("Please check email", "danger", "growl-top-right");
 }
})

});

Accounts.onEmailVerificationLink(function(token,done) {
    Accounts.verifyEmail(token, done);

    Bert.alert("You are logged in and Your email is verified. ", "success", "growl-top-right");
});
