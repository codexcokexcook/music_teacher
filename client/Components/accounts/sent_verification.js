import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { Mongo } from 'meteor/mongo';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';



Template.sent_verification_content.onRendered(function(){

  var user = Meteor.userId()

Meteor.call('sendVerificationEmail', user)

});

Accounts.onEmailVerificationLink(function(token,done) {
    Accounts.verifyEmail(token, done);
});
