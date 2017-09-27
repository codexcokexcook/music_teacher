import { Accounts } from 'meteor/accounts-base'

if (Meteor.isClient) {
  //Remove the old callback
  delete Accounts._accountsCallbacks['verify-email'];
  Accounts.onEmailVerificationLink(function (token, done) {
    Accounts.verifyEmail(token, function (error) {
      if (!error) {
        Bert.Alert("WRONG!!!","danger")
        return false;
      }
      Bert.Alert("WRONG!!!","success")
      done();


    });
  });
}
