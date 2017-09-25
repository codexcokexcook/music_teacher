import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Messages = new Mongo.Collection('messages');


Meteor.methods({
  'messages.insert'(text, owner){
    check(text, String);
    // Check if user is logged in
//    if(!Meteor.userId()){
//      throw new Meteor.Error('not-authorized');
//    }

var set_time = new Date();
// Convert machine time to human readable time
var message_timestamp = ("0" + set_time.getHours()).slice(-2) + ":" + ("0" + set_time.getMinutes()).slice(-2)


    Messages.insert({
      text,
      current_time: message_timestamp,
      createdAt: new Date(),
      owner: owner,
 //     username: Meteor.user().username,
    });
  },

  'messages.clear'(text){
      check(text, String);
      Messages.remove({});
  },
});
