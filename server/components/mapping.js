import { Meteor } from 'meteor/meteor';

Markers = new Mongo.Collection('markers');

Meteor.methods({
  'mapping.check_radius'(center_location, radius) {
    console.log(center_location);
    console.log(center_location.lng);
    console.log(center_location.lat);
    var searched_kitchen = Kitchen_details.find({
      kitchen_address_conversion: {"$geoWithin": {"$centerSphere": [[center_location.lng,center_location.lat], radius/6371]}}
    }).fetch();
    console.log(searched_kitchen);
    return searched_kitchen;
  }
});

//the problem right now is MongoDb take lng, lat, but google map takes lat, lng
//I need to convert the document fields to mongodb order to make "find" works
