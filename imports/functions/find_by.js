
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
      console.log('case 1');
      return Collections[collection].find({'serving_option': method, 'user_id':{$ne: Meteor.userId()}})

        }else if (!method){
          //Location
      console.log('case 2');
        return  Collections[collection].find({'user_id':{$ne: Meteor.userId()}})

        }
      }else if(method){
      console.log('case 3');
      return Collections[collection].find({'serving_option': method, 'user_id':{$ne: Meteor.userId()}})

    }else{
      console.log('case 4');
        return Collections[collection].find({'user_id':{$ne: Meteor.userId()}})

      }
}

export function search_distinct(collection, field){
  return _.uniq(collection.find({'buyer_id': Meteor.userId(), 'serving_option':'Delivery'}, {
      sort: {[field]: 1}, fields: {[field]: 1}
    }).fetch().map(x => x[field]), true);
  }
