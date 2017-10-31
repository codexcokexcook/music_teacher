import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';


Meteor.methods({


  'profile_details.update'(
    foodie_profile_id,
    foodie_name,
    first_name,
    last_name,
    mobile,
    profile_keywords,
    date_of_birth,
    gender,
    about_myself,
    home_address,
    office_address,
    allergy_tags,
    dietary_tags,
    card_number,
    card_fullname,
    card_exp_month,
    card_exp_year,
    cvv_code ){
    Profile_details.update(
    {_id: foodie_profile_id},
    {$set: {
      foodie_name: foodie_name,
      first_name: first_name,
      last_name: last_name,
      mobile: mobile,
      profile_keywords: profile_keywords,
      date_of_birth: date_of_birth,
      gender: gender,
      about_myself: about_myself,
      home_address: home_address,
      office_address: office_address,
      allergy_tags: allergy_tags,
      dietary_tags: dietary_tags,
      card_number: card_number,
      card_fullname: card_fullname,
      card_exp_month: card_exp_month,
      card_exp_year: card_exp_year,
      cvv_code: cvv_code

  }});
},

  'kitchen_details.update'(
  kitchen_profile_id,
  kitchen_name,
  chef_name,
  homecook_profile_keywords,
  kitchen_address,
  about_homecook_myself,
  bank_fullname,
  bank_name,
  bank_account_no
  ){
  Kitchen_details.update(
  {_id: kitchen_profile_id},
  {$set: {
      kitchen_name: kitchen_name,
      chef_name: chef_name,
      homecook_profile_keywords: homecook_profile_keywords,
      kitchen_address: kitchen_address,
      about_homecook_myself: about_homecook_myself,
      bank_fullname: bank_fullname,
      bank_name: bank_name,
      bank_account_no: bank_account_no

  }});
  }
});
