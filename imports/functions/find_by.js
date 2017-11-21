import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';
import { address_geocode } from '/imports/functions/address_geocode.js';


export function navbar_find_by(collection){

  var location = Session.get('address');
  var method = Session.get('method');

  if (collection === "Menu" || "Dishes") {
    if (location) {
      address_geocode('location', location);
      Meteor.call('mapping.check_radius', Session.get('location'), 5, function(error, result){
        if (error) {
          Materialise.toast(error, 4000, "round red lighten-2");
        }
        var filtered_kitchen = result;
      });
      if (method) {
        //location: T, method: T
        console.log('location: T, method: T');
        return Collections[collection].find({'serving_option': method, 'user_id':{$ne: Meteor.userId()}, 'kitchen_id': filtered_kitchen});
      } else if (!method) {
        //location: T, method: F
        console.log('location: T, method: F');
        return  Collections[collection].find({'user_id':{$ne: Meteor.userId()}});
      }
    } else if (method) {
      //location: F, method: T
      console.log('location: F, method: T');
      return Collections[collection].find({'serving_option': method, 'user_id':{$ne: Meteor.userId()}});
    } else {
      //location: F, method: F
      console.log('location: F, method: F');
      return Collections[collection].find({'user_id':{$ne: Meteor.userId()}});
    }
  } else { //if collection is Kitchen_details
    if (location) {
      address_geocode('location', location);
      Meteor.call('mapping.check_radius', Session.get('location'), 5, function(error, result){
        return result;
        if (error) {
          Materialise.toast(error, 4000, "round red lighten-2");
        }
      });
      if (method) {
        //location: T, method: T
        console.log('location: T, method: T');
        return Collections[collection].find({'serving_option': method, 'user_id':{$ne: Meteor.userId()}});
      } else if (!method) {
        //location: T, method: F
        console.log('location: T, method: F');
        return  Collections[collection].find({'user_id':{$ne: Meteor.userId()}});
      }
    } else if (method) {
      //location: F, method: T
      console.log('location: F, method: T');
      return Collections[collection].find({'serving_option': method, 'user_id':{$ne: Meteor.userId()}});
    } else {
      //location: F, method: F
      console.log('location: F, method: F');
      return Collections[collection].find({'user_id':{$ne: Meteor.userId()}});
    }
  }
}

export function search_distinct(collection, field){
  return _.uniq(collection.find({'buyer_id': Meteor.userId(), 'serving_option':'Delivery'}, {
      sort: {[field]: 1}, fields: {[field]: 1}
    }).fetch().map(x => x[field]), true);
  }
