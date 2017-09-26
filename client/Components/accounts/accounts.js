 import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';

import './accounts.html';



Template.accounts_form.onRendered(function(){

if(Meteor.userId()){

  FlowRouter.go('/msgDialog');
}


});
