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

    if(err) {
      Bert.alert(err.reason, "danger", "growl-top-right");

    }else {
      FlowRouter.go('/');
      Bert.alert("you are now logged out", "success", "growl-top-right");
    }
  });
}
});



// Accounts config
Messages = new Mongo.Collection('messages');


Template.msgDialog_content.helpers({
  'messages':function(){
    return Messages.find()
  }
});

Template.add.events({
  'submit .send-message': function(){
    event.preventDefault();

    // Get input value
    const target = event.target;
    const text = target.new_message.value;


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
