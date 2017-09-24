import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';

// Accounts config

Messages = new Mongo.Collection('messages');


Template.msgDialog_content.helpers({
  'messages':function(){
    return Messages.find()
  }
});

Template.message.onRendered(function(){
  this.$('.chips').material_chip();
  var address = Meteor.userId().address;
  console.log(address);
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
          Meteor.call('messages.insert',response);
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
    Meteor.call('messages.insert', text);

    // Clear form
    target.new_message.value = '';

    return false;
  }
});

/*
Template.voice.events({
  'click .mic': function(){
    event.preventDefault();

    var accessToken = "9e87a112bbe247b480bdb5f6906afca6";
	var baseUrl = "https://api.api.ai/v1/";

	var recognition;
	if (recognition) {
		//stopRecognition
		recognition.stop();
	    recognition = null;
	   $("#rec").text(recognition ? "Stop" : "Speak");
	} else {
		//startRecognition
	   recognition = new webkitSpeechRecognition();
	   recognition.onstart = function(event) {
	      $("#rec").text(recognition ? "Stop" : "Speak");
	   };
	   recognition.onresult = function(event) {
	       var text = "";
	       for (var i = event.resultIndex; i < event.results.length; ++i) {
	           text += event.results[i][0].transcript;
	       }
		   $("#input").val(text);
		   //stopRecognition
		   recognition.stop();
	       recognition = null;
	   };
	   recognition.onend = function() {
		   //stopRecognition
		   recognition.stop();
	       recognition = null;
       };
       recognition.lang = "yue-Hant-HK";
       recognition.start();
	}

    return false;
  }
});

*/
