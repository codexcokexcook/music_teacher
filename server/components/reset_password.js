import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Accounts } from 'meteor/accounts-base';

Accounts.emailTemplates.resetPassword = {
  subject(user) {
    return "Blueplate.co - Reset your password";
  },
  text(user, url) {
    let urlWithoutHash = url.replace('#/', ''),
        emailBody = `Hi there,\n\n Please click on the link below to reset your password:\n\n${urlWithoutHash}\n\n\n\nRegards,\nBlueplate.co`
    return emailBody;
  }
}
