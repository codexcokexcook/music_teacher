import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';


Messages = new Mongo.Collection('messages');

Meteor.methods({
  'messages.insert'(text, owner, channel, chips) {
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
      channel: channel,
      chips: chips
    });
  },

  'apiai.response'(text) {
    var accessToken = "31cd49742ab64d17815beb84ba78e585";
    var baseUrl = "https://api.api.ai/v1/";

    // This is a Ajax request, which should be move to webhooks
    HTTP.call(
      'POST', baseUrl + "query?v=2017", {
          headers: {
            "Authorization": "Bearer " + accessToken,
            "Content-Type": "application/json; charset=utf-8"
          },
          data: {
            query: text,
            lang: "en",
            sessionId: "somerandomthing"
          }
      }, (error, result) => {
        if(!error) {
          var chips = result.data.result.fulfillment.messages[1].payload.chips;
          var response = result.data.result.fulfillment.messages[0].speech;
          Meteor.call('messages.insert',response, "Cameron Stevenson", Meteor.userId(),chips);
        } else {
          console.log(error);
        }
      });
    },

  'messages.clear'(channel){
      Messages.remove({channel: channel});
  }
});
