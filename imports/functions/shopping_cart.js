
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { FilesCollection } from 'meteor/ostrio:files';



export function search_distinct_for_delivery_in_shopping_cart(collection, field){
  return _.uniq(collection.find({'buyer_id': Meteor.userId(), 'serving_option':'Delivery'}, {
      sort: {[field]: 1}, fields: {[field]: 1}
    }).fetch().map(x => x[field]), true);
  }

  export function search_distinct_in_shopping_cart(collection, field){
    return _.uniq(collection.find({'buyer_id': Meteor.userId()}, {
        sort: {[field]: 1}, fields: {[field]: 1}
      }).fetch().map(x => x[field]), true);
    }
