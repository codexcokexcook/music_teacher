
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { FilesCollection } from 'meteor/ostrio:files';


export function navbar_find_by(collection){

  var location = Session.get('location');
  var method = Session.get('method');


  if(location){
    if(method){
      //Location
      return Collections[collection].find({'serving_option': method, 'user_id':{$ne: Meteor.userId()}})

        }else if (!method){
          //Location
        return  Collections[collection].find({'user_id':{$ne: Meteor.userId()}})

        }
    }else if(method){
      return Collections[collection].find({'serving_option': method, 'user_id':{$ne: Meteor.userId()}})

    }else{
        return Collections[collection].find({'user_id':{$ne: Meteor.userId()}})

      }
}
