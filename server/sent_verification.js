import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { Mongo } from 'meteor/mongo';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


Meteor.startup(() => {
process.env.MAIL_URL = "smtps://ACCOUNT%2EADMIN%40BLUEPLATE%2ECO:ilqkgygkgeojntmu@smtp.gmail.com:465";
});


Meteor.methods({

'sendVerificationEmail'(user){

 Accounts.sendVerificationEmail(user);


}
})

/**
Accounts.emailTemplates.siteName = 'Blueplate Technologies';
Accounts.emailTemplates.from = 'Blueplate Accounts Admin <account.admin@blueplate.co>';
Accounts.emailTemplates.enrollAccount.subject = (user) => {
  return `Welcome to Blueplate, ${user.profile.first_name}`;
};
Accounts.emailTemplates.resetPassword.from = () => {
  // Overrides the value set in `Accounts.emailTemplates.from` when resetting
  // passwords.
  return 'Blueplate Password Reset <no-reply@blueplate.co>';
};
Accounts.emailTemplates.verifyEmail = {
   subject() {
      return "Activate your account now!";
   },
   text(user, url) {
      return `Hey ${user}! Verify your e-mail by following this link: ${url}`;
   }
};
**/
