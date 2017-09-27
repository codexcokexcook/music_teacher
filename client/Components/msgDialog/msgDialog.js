import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.msgDialog_content.onRendered(function(){
  if(Meteor.userId()){
    FlowRouter.go('/msgDialog');
  } else {
    FlowRouter.go('/login');
  }
});

Template.msgDialog_navbar.events({
  'click .brand-logo': function(){
    console.log("Logout");
    Meteor.logout(function(err){
      if (err) {
        Bert.alert(err.reason, "danger", "growl-top-right");
      } else {
        FlowRouter.go('/');
        Bert.alert("you are now logged out", "success", "growl-top-right");
      }
    });
  }
});

// Accounts config
var channel_name = "bp-" + Meteor.userId();
Messages = new Mongo.Collection(channel_name);

Template.msgDialog_content.onRendered(function () {
  Meteor.call('channel.create', "bp-"+ Meteor.userId());
  Meteor.setTimeout(function() {
    var message_window = $("#messages_wrap").height();
    $(".conversation-screen").animate({scrollTop:message_window},0);
  }, 800);
});

Template.msgDialog_content.helpers({
  'messages':function() {
    return Messages.find();
  }
});

Template.message.helpers({
  'message_owner':function() {
    if (this.owner == Meteor.userId()) {
      return true;
    };
  }
});

Template.add.events({
  'submit .send-message': function(){
    event.preventDefault();

    // below should be arranged back to back-end using methods
    var accessToken = "31cd49742ab64d17815beb84ba78e585";
    var baseUrl = "https://api.api.ai/v1/";
    // Get input value
    const target = event.target;
    const text = target.new_message.value;

    $.ajax({
				type: "POST",
				url: baseUrl + "query?v=20150910",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				headers: {
					"Authorization": "Bearer " + accessToken
				},
				data: JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" }),
				success: function(data) {
					console.log(JSON.stringify(data, undefined, 2));
          var response = data.result.fulfillment.speech;

          Meteor.call('messages.insert',response, "Cameron Stevenson");

          var message_window = $("#messages_wrap").height();
          $(".conversation-screen").animate({scrollTop:message_window},500);
				},
				error: function() {
					console.log("Internal Server Error");
				}
			});
    // Insert note into collection
    /*
    Notes.insert({
      text,
      ceratedAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
    */
    Meteor.call('messages.insert', text, Meteor.userId());

    // Clear form
    target.new_message.value = '';
    // Get message dialog to move to the bottom after message submitted
    var message_window = $("#messages_wrap").height();
    $(".conversation-screen").animate({scrollTop:message_window},500);
  }
});
