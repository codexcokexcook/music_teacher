import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { FilesCollection } from 'meteor/ostrio:files';


Template.start_cooking.helpers({

  'order': function(){
    return Order_record.find({seller_id: Meteor.userId(), status: 'Created'})
  }




})
