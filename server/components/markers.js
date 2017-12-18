import { Match } from 'meteor/check';
import { check } from 'meteor/check';


Meteor.methods({
  'markers.insert'(user_id, kitchen_id, lat, lng) {
    check(user_id, String);
    check(kitchen_id, String);
    check(lat, Match.any);
    check(lng, Match.any);

    Markers.insert({
      user_id: user_id,
      kitchen_id: kitchen_id,
      lat: lat,
      lng: lng,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  },
  'markers.update'(user_id, kitchen_id, lat, lng) {
    check(user_id, String);
    check(kitchen_id, String);
    check(lat, Match.any);
    check(lng, Match.any);
    
    Markers.update({
      user_id: user_id
    },{$set: {
      kitchen_id: kitchen_id,
      lat: lat,
      lng: lng,
      updatedAt: new Date()
    }});
  }
});
