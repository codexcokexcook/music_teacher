import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Messages = new Mongo.Collection('messages');


Meteor.methods({
  'messages.insert'(text){
    check(text, String);
    // Check if user is logged in
//    if(!Meteor.userId()){
//      throw new Meteor.Error('not-authorized');
//    }

var message_tsmp = new Date();


    Messages.insert({
      text,
      createdAt: message_tsmp.toTimeString(),
 //     owner: Meteor.userId(),
 //     username: Meteor.user().username,
    });
  },

  'messages.clear'(text){
      check(text, String);
      Messages.remove({});
  }
});
