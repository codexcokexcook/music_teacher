import { Meteor } from 'meteor/meteor';

Profile_details = new Mongo.Collection('profile_details');
Address_details = new Mongo.Collection('address_details');


Meteor.methods({
  'profile_details.insert'(
    userId,
    first_name,
    last_name,
    kitchen_name,
    profile_keywords,
    date_of_birth,
    gender,
    about_myself){
    Profile_details.insert({
    userId,
    first_name: first_name,
    last_name: last_name,
    kitchen_name: kitchen_name,
    profile_keywords: profile_keywords,
    date_of_birth: date_of_birth,
    gender: gender,
    about_myself: about_myself

  });
},
  'address_details.insert'(
    userId,
    address_name_1,
    address_details_1,
    contact_no_1,
    address_name_2,
    address_details_2,
    contact_no_2
    ){
    Address_details.insert({
      userId,
      address_name_1,
      address_details_1,
      contact_no_1,
      address_name_2,
      address_details_2,
      contact_no_2

  });
}
});
